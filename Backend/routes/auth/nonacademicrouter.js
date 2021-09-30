const router = require('express').Router()
const nonacademiccontroller = require('../../controllers/auth/nonacademiccontroller')

router.post('/register', nonacademiccontroller.register)






module.exports = router