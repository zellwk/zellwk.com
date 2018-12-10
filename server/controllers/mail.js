const mail = require('../handlers/mail')
const spreadsheets = require('../handlers/spreadsheets')

const parseEntriesForGsheets = entries => {
  const filter = [
    'subject',
    'initial-message',
    'final-message'
  ]
  return entries
    .filter(entry => !filter.includes(entry.name))
    .map(entry => entry.answer)
}

const sendGsheet = (options) => {
  const { spreadsheetId, entries } = options
  if (!spreadsheetId) return Promise.resolve(true)

  return spreadsheets.send({
    spreadsheetId,
    data: parseEntriesForGsheets(entries)
  })
}

exports.sendMail = async (req, res) => {
  const { entries } = req.body

  const gSheetPromise = sendGsheet(req.body)
  const mailPromise = mail.send({
    entries,
    filename: 'index'
  })

  await Promise.all([mailPromise, gSheetPromise])

  res.json('success')
}
