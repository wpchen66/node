let mogoose = require('mongoose')

let userSchema = new mogoose.Schema({
  username: [String, Number],
  mobile: Number,
  nickname: [String, Number],
  password: [String, Number]
})

export const userModel = mogoose.model('userInfo', userSchema)

