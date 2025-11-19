import dotenv from 'dotenv'
import pm2 from 'pm2'
import config from './site-config.js'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.production' })

const instances = process.env.WEB_CONCURRENCY || -1
const maxMemory = process.env.WEB_MEMORY || 512
const command = process.argv[2] || 'start'

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

pm2.connect(function (err) {
  if (err) handleError(err, 'Error connecting to PM2:')

  if (command === 'start') {
    pm2.start(appConfig, function (err) {
      if (err) return handleError(err, 'Error while launching applications')
      console.log('PM2 and application has been successfully started')
      setupLogStreaming()
    })
  } else if (command === 'reload') {
    pm2.reload(config.appName, { updateEnv: true }, function (err) {
      if (err) return handleError(err, 'Error reloading application')
      console.log('Application reloaded')
      disconnect()
    })
  } else if (command === 'stop') {
    pm2.stop(config.appName, function (err) {
      if (err) return handleError(err, 'Error stopping application')
      console.log('Application stopped')
      disconnect()
    })
  } else if (command === 'delete') {
    pm2.delete(config.appName, function (err) {
      if (err) return handleError(err, 'Error deleting application')
      console.log('Application deleted')
      disconnect()
    })
  } else {
    console.error(`Unknown command: ${command}`)
    console.error('Available commands: start, reload, stop, delete')
    disconnect()
    process.exit(1)
  }
})

// NOTE TO SELF. Logs are located in .pm2/logs
function handleError(err, message) {
  console.error(message, err.stack || err)
  pm2.disconnect()
  process.exit(1)
}

function disconnect() {
  pm2.disconnect()
}

function setupLogStreaming() {
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
}
