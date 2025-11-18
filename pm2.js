import pm2 from 'pm2'
import config from './site-config.js'
const instances = process.env.WEB_CONCURRENCY || -1
const maxMemory = process.env.WEB_MEMORY || 512
const command = process.argv[2] || 'start'

// NOTE TO SELF. Logs are located in .pm2/logs
pm2.connect(function (err) {
  if (err) {
    console.error('Error connecting to PM2:', err)
    process.exit(1)
  }

  const appConfig = {
    script: 'start.js',
    name: config.appName,
    exec_mode: 'cluster',
    watch: false,
    instances,
    max_memory_restart: maxMemory + 'M',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    log_file: 'combined.log',
    error_file: 'err.log',
    out_file: 'out.log',
    merge_logs: true,
    env: {
      NODE_ENV: 'production',
    },
  }

  if (command === 'start') {
    pm2.start(appConfig, function (err) {
      if (err) {
        console.error('Error while launching applications', err.stack || err)
        pm2.disconnect()
        return process.exit(1)
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
  } else if (command === 'reload') {
    pm2.reload(config.appName, { updateEnv: true }, function (err) {
      if (err) {
        console.error('Error reloading application', err.stack || err)
        pm2.disconnect()
        return process.exit(1)
      }
      console.log('Application reloaded')
      pm2.disconnect()
    })
  } else if (command === 'stop') {
    pm2.stop(config.appName, function (err) {
      if (err) {
        console.error('Error stopping application', err.stack || err)
        pm2.disconnect()
        return process.exit(1)
      }
      console.log('Application stopped')
      pm2.disconnect()
    })
  } else if (command === 'delete') {
    pm2.delete(config.appName, function (err) {
      if (err) {
        console.error('Error deleting application', err.stack || err)
        pm2.disconnect()
        return process.exit(1)
      }
      console.log('Application deleted')
      pm2.disconnect()
    })
  } else {
    console.error(`Unknown command: ${command}`)
    console.error('Available commands: start, reload, stop, delete')
    pm2.disconnect()
    process.exit(1)
  }
})
