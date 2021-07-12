const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/login',
    [
        check('login', 'Некоректный логин').exists(),
        check('password', 'Некоректный пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req, res)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные'
                })
            }

            const { login, password } = req.body

            const user = await User.findOne({ login })
            if (!user) {
                return res.status(400).json({ message: 'Логин не найден' })
            }

            const hashedPassword = await bcrypt.compare(password, user.password)

            const jwtSecret = 'ddcdck4km4mmmf5mmkm'
            const token = jwt.sign(
                { userId: user.id },
                jwtSecret,
                { expiresIn: '1h' }
            )
            res.json({ token, userId: user.id })

        } catch (error) {
            console.log(error)
        }

    })
router.post('/users')

module.exports = router