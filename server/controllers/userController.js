const { comparePassword } = require("../helper/bcryptjs")
const User = require("../models/user")
const { generateToken } = require("../helper/jwt")

class UserController {
  static async register (req, res, next) {
    try {
      const { email, password, name } = req.body
      const user = await User.findByEmail(email)

      if (user) {
        return next({name: 'EMAIL_ALREADY_USED'})
      } else {
        const newUser = await User.create({ email, password, name })
        const payload = {
          _id: newUser._id,
          email: newUser.email,
          name: newUser.name
        }
        const access_token = generateToken(payload)
        res.status(201).json({access_token})
      }
    } catch (error) {
      next(error)
    }
  }

  static async login (req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findByEmail(email)

      if (!user) {
        next({name: 'WRONG_LOGIN'})
      } 
      const isValidPass = comparePassword(password, user.password)
      if (!isValidPass) {
        next({name: 'WRONG_LOGIN'})
      } else {
        const payload = {
          _id: user._id,
          email: user.email,
          name: user.name
        }
        const access_token = generateToken(payload)
        res.status(200).json({access_token})
      }

    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = UserController