const pm2 = require('pm2')
const instances = process.env.WEB_CONCURRENCY || -1
const maxMemory = process.env.WEB_MEMORY || 512

// NOTE TO SELF. Logs are located in .pm2/logs
pm2.connect(function () {
  pm2.start({
    script: 'start.js',
    name: 'zellwk.com',
    exec_mode: 'cluster',
    watch: false,
    instances: instances,
    max_memory_restart: maxMemory + 'M',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    log_file: 'combined.log',
    error_file: 'err.log',
    out_file: 'out.log',
    merge_logs: true,
    env: {
      'NODE_ENV': 'production'
    }
  }, function (err) {
    if (err) {
      return console.error('Error while launching applications', err.stack || err)
    }

    console.log('PM2 and application has been succesfully started')

    // Display logs in standard output
    pm2.launchBus(function (err, bus) {
      if (err) console.log(err)
      console.log('[PM2] Log streaming started')

      bus.on('log:out', function (packet) {
        console.log('[App:%s] %s', packet.process.name, packet.data)
      })

      bus.on('log:err', function (packet) {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data)
      })
    })
  })
})
