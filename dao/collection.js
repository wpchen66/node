let mogoose = require('mongoose')
let Schema = mogoose.Schema
let userSchema = new mogoose.Schema({
  username: [String, Number],
  token: String,
  mobile: Number,
  nickname: [String, Number],
  password: [String, Number],
  money: {
    type: Number,
    default: 0
  }
})
//密码加密  除了用户谁都不知道密码
//  userSchema.pre('save', function (next) {
//    let _this = this,
//    if(this.isModified('password') || this.isNew){
//      bcrypt.genSalt(10, function (err, salt) {
//        if(err) return next(err)
//        bcrypt.hash(_this.password, salt, function (err, hash) {
//          if(err) return next(err)
//          _this.password = hash
//          next()
//        })
//      })
//    }
//  })
// userSchema.methods.comparePassword = function (passw, cb) {
//   bcrypt.compare(passw, this.password, (err, isMatch) => {
//     if(err) return cb(err)
//     cb(null, isMatch)
//   })
// }

let goodsSchema = new mogoose.Schema({
  date: {
    type: String
  },
  time: {
    type: String
  },
  name: {
    type: String
  },
  number: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  des: {
    type: String
  },
  pic: {
    type: [String, Array]
  },
  firClssifyId:{
    type: String
  },
  secClssifyId:{
    type: String
  },
  tirClssifyId:{
    type: String
  }
})

let firClssifySchema = new mogoose.Schema({
  name: {
    type: String
  },
  mobilename: {
    type: String
  },
  color: {
    type: String
  },
  isShow: {
    type: Boolean
  },
  pic: {
    type: String
  },
  sort: {
    type: Number
  },
  secClssifyId: [
    {
      type:Schema.Types.ObjectId,
      ref: "secClssify"
    }
  ]
})
let secClssifySchema = new mogoose.Schema({
  firClssifyId: {
    type: Schema.Types.ObjectId,
    ref: 'firClssify'
  },
  tirClssifyId: [{
    type: Schema.Types.ObjectId,
    ref: "tirClssify"
  }],
  name: {
    type: String
  },
  mobilename: {
    type: String
  },
  color: {
    type: String
  },
  isShow: {
    type: Boolean
  },
  pic: {
    type: String
  },
  sort: {
    type: Number
  }
})
let tirClssifySchema = new mogoose.Schema({
  secClssifyId: {
    type: mogoose.Schema.Types.ObjectId,
    ref: 'secClssify'
  },
  name: {
    type: String
  },
  mobilename: {
    type: String
  },
  color: {
    type: String
  },
  isShow: {
    type: Boolean
  },
  pic: {
    type: String
  },
  sort: {
    type: Number
  }
})

let brandSchema = new Schema({
  name: {
    type: String
  },
  firClssifyId:{
    type: String
  },
  secClssifyId:{
    type: String
  },
  tirClssifyId:{
    type: String
  },
  sort: {
    type: Number
  },
  pic: {
    type: String
  }
})

export const firClass = mogoose.model('firClssify', firClssifySchema)
export const secClass = mogoose.model('secClssify', secClssifySchema)
export const tirClass = mogoose.model('tirClssify', tirClssifySchema)
export const userModel = mogoose.model('userInfo', userSchema)
export const goodsModel = mogoose.model('goodsInfo', goodsSchema)