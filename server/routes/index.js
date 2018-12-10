const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandlers.js')
const transferCtrl = require('../controllers/transfer')
const { sendMail } = require('../controllers/mail')

router.use('/transfer/*', transferCtrl)
router.post('/email', catchErrors(sendMail))

module.exports = router
