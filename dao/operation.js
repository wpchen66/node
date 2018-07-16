import {
  userModel,
  goodsModel
} from './collection.js'
import {
  Model
} from 'mongoose';
import * as select from './config.js';
import jwt from 'jsonwebtoken';
const fs = require('fs');
const formidable = require('formidable');
const path = require('path')
const uuid = require('uuid/v4')
const serverUrl = '127.0.0.1:3000'
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
    if (res) {
      let token = jwt.sign({
        userId: res.id
      }, select.secret, {
        expiresIn: 3600
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
export function addGoods(req, callback) {
  let goods = {}
  const date = new Date()
  const form = new formidable.IncomingForm()
  let imgPath = path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
  let imgList = []
  fs.exists(path.resolve('static/images/' + date.getFullYear()), function (exists) {
    if (!exists) {
      fs.mkdir(path.resolve('static/images/' + date.getFullYear()), function (err, data) {
        if (err) {
          console.error(err)
        }
        console.log('年目录创建成功')
      })
    }
  })
  fs.exists(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1)), function (exists) {
    if (!exists) {
      fs.mkdir(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1)), function (err, data) {
        if (err) {
          console.error(err)
        }
        console.log('月目录创建成功')
      })
    }
  })
  fs.exists(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()), function (exists) {
    if (!exists) {
      fs.mkdir(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()), function (err, data) {
        if (err) {
          console.error(err)
        }
        console.log('日目录创建成功')
      })
    }
  })
  // form.uploadDir = imgPath
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.error(err)
    }
    goods = JSON.parse(fields.form)
    console.log(fields, goods)
    Object.values(files).forEach(function (item, index) {
      // console.log(item)
      fs.readFile(item.path, function (err, data) {
        if (err) {
          console.error(err)
          return
        }
        const id = uuid()
        let type = item.type.split('/')[1]
        fs.writeFile(imgPath + '/' + id + '.' + type, data, function (err, data) {
          if (err) {
            console.error(err)
          }
          const imgUrl = serverUrl + '/static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + id + '.' + type
          imgList.push(imgUrl)
          if (index === Object.values(files).length - 1) {
            const date = new Date()
            const year = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            const goodsInfo = new goodsModel({
              time: time,
              date: year,
              name: goods.name,
              des: goods.des,
              price: goods.price,
              number: goods.number,
              pic: imgList
            })
          
            goodsInfo.save(function (err, data) {
              if (err) {
                console.log(err)
                return
              }
              console.log(data, '商品保存成功')
            })
          }
        })
      })
    })

    // console.log(files)
    // let b = JSON.parse(files.upload)
    // console.log(typeof files)
    // files.upload.forEach((item, index)=> {
    //   console.log(item)
    // })

  })
}
export function getGoodsList(callback) {
  goodsModel.find(function (err, res) {
    let obj = {
      success: true,
      data: res
    }
    callback(obj)
  })
}