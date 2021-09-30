const router = require('express').Router()
const academiccontroller = require('../../controllers/auth/academiccontroller')
const auth = require('../../middlewares/auth')


router.post('/register', academiccontroller.register)

router.get('/acarefresh_token', academiccontroller.acarefreshToken)

router.post('/login', academiccontroller.login)

router.get('/logout', academiccontroller.logout)

router.get('/infor', auth, academiccontroller.getAca)




module.exports = router