import {
  userModel,
  goodsModel
} from './collection.js'
import {
  Model
} from 'mongoose';
import * as select from './config.js';
import jwt from 'jsonwebtoken';
export function addUser(user, callback) {
  let {
    username,
    mobile,
    nickname,
    password
  } = user
  console.log(username, mobile)
  userModel.findOne({
    $or: [{
      username
    }, {
      mobile
    }]
  }, function (err, res) {
    if (err) return console.error(err)
    if (res && res.username == username) {
      let obj = {
        success: false,
        message: '该用户已存在，请重新注册'
      }
      callback(obj)
      return
    } else if (res && res.mobile == mobile) {
      console.log(res.mobile)
      let obj = {
        success: false,
        message: '该手机号已存在，请重新注册'
      }
      callback(obj)
      return
    }

    let userInfo = new userModel({
      username,
      mobile,
      password,
      nickname
    })
    userInfo.save(function (err, res) {
      if (err) return console.error(err)
      let obj = {
        success: true,
        message: '注册成功'
      }
      callback(obj)
    })

    // let userInfo = new userModel({
    //       username,
    //       mobile,
    //       password,
    //       nickname
    //     })
    //     userInfo.save(function (err, res) {
    //       if (err) return console.error(err)
    //       let obj = {
    //         success: true,
    //         message: '注册成功'
    //       }
    //       callback(obj)
    //     })
    // if (res) {
    //   let userInfo = new userModel({
    //     username,
    //     mobile,
    //     password,
    //     nickname
    //   })
    //   userInfo.save(function (err, res) {
    //     if (err) return console.error(err)
    //     let obj = {
    //       success: true,
    //       message: '注册成功'
    //     }
    //     callback(obj)
    //   })
    // } else {
    //   let obj = {
    //     success: false,
    //     message: '该用户已存在，请重新注册'
    //   }
    //   callback(obj)
    // }
  })
}

export function queryUser(user, callback) {
  let {
    username,
    password,
    mobile
  } = user

  userModel.findOne({
    $or: [{
      username
    }, {
      mobile
    }],
    password
  }, function (err, res) {
    if (err) {
      console.error(err)
      return
    }
    console.log(res)
    if (res) {
      let token = jwt.sign({
        userId: res.id
      }, select.secret, {
        expiresIn: 10
      })
      res.token = token
      res.save(function (err) {
        if (err) {
          callback({
            success: false,
            message: 'token 发生错误'
          })
        } else {
          let obj = {
            success: true,
            message: '登陆成功',
            nickname: res.nickname,
            token: 'Bearer ' + token
          }
          callback(obj, token)
        }
      })

    } else {
      let obj = {
        success: false,
        message: '账户或密码错误，请重新登陆',
      }
      callback(obj)
    }
  })
}
export function getGoodsList () {
  console.log(111)
  goodsModel.find(function(err, res) {
    console.log(res,1)
  })
}