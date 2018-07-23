import {
  userModel,
  goodsModel,
  firClass,
  secClass,
  tirClass
} from './collection.js'
import {
  Model
} from 'mongoose';
import * as select from './config.js';
import jwt from 'jsonwebtoken';
import {
  createDir,
  saveClass,
  saveSecClass,
  saveTirClass
} from '../util/util.js'
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
  createDir(date)
  // form.uploadDir = imgPath
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.error(err)
    }
    goods = JSON.parse(fields.form)
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
          const imgUrl = 'http://' + serverUrl + '/static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + id + '.' + type
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
export function updataGoods(req, callback) {
  const form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.error(err)
    }
    const goodsInfo = JSON.parse(fields.form)
    const id = goodsInfo.id;
    const name = goodsInfo.name;
    const des = goodsInfo.des;
    const price = goodsInfo.price;
    const number = goodsInfo.number
    goodsModel.findOne({
      _id: id
    }, function (err, res) {
      if (err) {
        console.error(err)
      }
      // console.log(res, 1231223)
      let arr = []
      console.log(res.pic, 2222222)
      if(goodsInfo.removeList && goodsInfo.removeList.length){
        res['pic'].forEach(function (item, index) {
          console.log(goodsInfo.removeList, 444444444)
          if (goodsInfo.removeList.indexOf(item)===-1) {
            arr.push(item)
            console.log(arr, 11111)
          }
        })
      }else{
        arr = res.pic
      }
      
      let date = new Date()
      console.log(files,66666666666666)
      if (Object.values(files).length) {
        let imgPath = path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
        let imgList = []
        createDir(date)
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
              const imgUrl = 'http://' + serverUrl + '/static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + id + '.' + type
              imgList.push(imgUrl)
              if (index === Object.values(files).length - 1) {
                const date = new Date()
                const year = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
                const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                let newarr;
                res.name = name
                res.price = price
                res.des = des
                res.number = number
                console.log(imgList, arr, 1212121211)
                newarr = [...arr, ...imgList]
                res.pic = newarr;
                res.save(function (err, data) {
                  if (err) {
                    console.log(err)
                    return
                  }
                  console.log(data, '商品更新成功')
                })
              }
            })
          })
        })
      } else {
        console.log(55555555)
        res.name = name
        res.price = price
        res.des = des
        res.number = number
        res.pic = arr;
        res.save(function (err, data) {
          if (err) {
            console.log(err)
            return
          }
          console.log(data, '商品更新成功')
        })
      }
      // data.save(function(err, data){
      //   if(err){
      //     console.error(err)
      //   }
      //   console.log(data, '商品更新成功')
      // })
    })
  })
}

export function addClassify(req, callback){
  const form = new formidable.IncomingForm() 
  form.parse(req, function(err,fields, files){
    console.log(fields, files)
    const classifyInfo = JSON.parse(fields.form);
    const classname = classifyInfo.name;
    const mobilename = classifyInfo.mobilename;
    const color = classifyInfo.color;
    const sort = classifyInfo['sort'];
    const isShow = classifyInfo.isShow;
    const firClassify = classifyInfo.firstClassify
    const secClassify = classifyInfo.secClassify;
    const tirClassify = classifyInfo.tirClassify;
    let imgUrl = "";
    const date = new Date()
      if(Object.values(files).length){
        let imgPath = path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
        let imgList = ""
        const imgFile = files['0']
        createDir(date)
        fs.readFile(imgFile.path, function(err, data){
          if (err) {
            console.error(err)
            return
          }
          const id = uuid()
          let type = imgFile.type.split('/')[1]
          fs.writeFile(imgPath + '/' + id + '.' + type, data, function(err, res){
            if(err){
              console.error(err)
            }
             imgUrl = `http://${serverUrl}/static/images/${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}/${id}.${type}`
            if(!firClassify){
              saveClass(firClass, classifyInfo, imgUrl,callback)
              return
            }
            if(!secClassify){
              saveSecClass(secClass, classifyInfo, imgUrl,callback,firClass)
              return
            }
            if(!tirClassify){
              saveTirClass(tirClass, classifyInfo, imgUrl,callback,secClass)
              return
            }
          })
        })
      }else{
        if(!firClassify){
          saveClass(firClass, classifyInfo, imgUrl,callback)
          return
        }
        if(!secClassify){
          saveSecClass(secClass, classifyInfo, imgUrl,callback,firClass)
          return
        }
        if(!tirClassify){
          saveTirClass(tirClass, classifyInfo, imgUrl,callback,secClass)
          return
        }
      }
  })
}

export function getFirClassify(callback){
  firClass.find(function(err, data){
    if(err){
      console.error(err)
    }
    let obj ={
      success: true,
      data: data
    }
    callback(obj)
  })
}

export function getSecClassify(id, callback){
  // secClass.findById('5b557ff9b6aa76268c4bf4f2').populate('firClssifyId').exec(function(err, data){
  //   console.log(data,11111,data.secClssifyId)
  // })
  firClass.findById(id).populate('secClssifyId').exec(function(err, data){
    if(err){
      console.error(err)
    }
    let obj = {
      success: true,
      data: data.secClssifyId
    }
    callback(obj)
  })
}