const denodeify = require('denodeify')
const { google } = require('googleapis')
const sheets = google.sheets('v4').spreadsheets
const key = require('../../secrets/gcreds.json')

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
  ],
  'zell@zellwk.com'
)

const jwtAuth = denodeify(jwtClient.authorize).bind(jwtClient)

const getDateString = _ => {
  let now = new Date()
  return `${now.getDate()} ${now.toLocaleString('en-us', { month: 'short' })} ${now.getFullYear()}`
}

const isTest = _ => {
  return process.env.NODE_ENV === 'production'
    ? ''
    : 'Test'
}

const makeData = data => {
  return [getDateString(), ...data, isTest()]
}

const makeConfig = ({
  auth = jwtClient,
  valueInputOption = 'USER_ENTERED',
  range = 'Sheet1!A1',
  spreadsheetId,
  data
} = {}) => {
  if (!spreadsheetId) throw new Error('Please provide a spreadsheetId')
  if (!data) throw new Error('Please data to append')

  return Object.assign({}, {
    auth,
    valueInputOption,
    range,
    spreadsheetId,
    resource: { values: [makeData(data)] }
  })
}

const appendSpreadsheet = config => {
  return new Promise((resolve, reject) => {
    sheets.values.append(config, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

// Send spreadsheet
exports.send = async options => {
  return jwtAuth()
    .then(() => appendSpreadsheet(makeConfig(options)))
}
