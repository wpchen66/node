import {
  userModel
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

  userModel.findOne({
    username
  }, function (err, res) {
    console.log(res, 2)
    if (err) return console.error(err)
    if (res === null) {
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
    } else {
      let obj = {
        success: false,
        message: '该用户已存在，请重新注册'
      }
      callback(obj)
    }
  })
}

export function queryUser(user, callback) {
  let {username, password, mobile} = user

  userModel.findOne({$or:[{username},{mobile}], password}, function(err, res){
    if(err) {
      console.error(err)
      return
    }
    console.log(res)
    if(res) {
      let token = jwt.sign({name: res.username}, select.secret, {
        expiresIn: 10800
      })
      res.token = token
      res.save(function(err) {
        callback({
          success: false,
          message: 'token 发生错误'
        })
        return
      })
      let obj = {
        success: true,
        message: '登陆成功',
        nickname: res.nickname,
        token: 'Bearer'+token
      }
      callback(obj)
    }else{
      let obj = {
        success: false,
        message: '账户或密码错误，请重新登陆',
      }
      callback(obj)
    }
  })
}