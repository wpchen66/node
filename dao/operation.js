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
  saveTirClass,
  saveHandle,
  deleteHandle,
  findbyId,
  createClass
} from '../util/util.js'
import {
  rejects
} from 'assert';
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
      if (goodsInfo.removeList && goodsInfo.removeList.length) {
        res['pic'].forEach(function (item, index) {
          console.log(goodsInfo.removeList, 444444444)
          if (goodsInfo.removeList.indexOf(item) === -1) {
            arr.push(item)
            console.log(arr, 11111)
          }
        })
      } else {
        arr = res.pic
      }

      let date = new Date()
      console.log(files, 66666666666666)
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

export function addClassify(req, callback) {
  const form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
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
    if (Object.values(files).length) {
      let imgPath = path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
      let imgList = ""
      const imgFile = files['0']
      createDir(date)
      fs.readFile(imgFile.path, function (err, data) {
        if (err) {
          console.error(err)
          return
        }
        const id = uuid()
        let type = imgFile.type.split('/')[1]
        fs.writeFile(imgPath + '/' + id + '.' + type, data, function (err, res) {
          if (err) {
            console.error(err)
          }
          imgUrl = `http://${serverUrl}/static/images/${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}/${id}.${type}`
          if (!firClassify) {
            saveClass(firClass, classifyInfo, imgUrl, callback)
            return
          }
          if (!secClassify) {
            saveSecClass(secClass, classifyInfo, imgUrl, callback, firClass)
            return
          }
          if (!tirClassify) {
            saveTirClass(tirClass, classifyInfo, imgUrl, callback, secClass)
            return
          }
        })
      })
    } else {
      if (!firClassify) {
        saveClass(firClass, classifyInfo, imgUrl, callback)
        return
      }
      if (!secClassify) {
        saveSecClass(secClass, classifyInfo, imgUrl, callback, firClass)
        return
      }
      if (!tirClassify) {
        saveTirClass(tirClass, classifyInfo, imgUrl, callback, secClass)
        return
      }
    }
  })
}

export function getFirClassify(callback) {
  firClass.find(function (err, data) {
    if (err) {
      console.error(err)
    }
    let obj = {
      success: true,
      data: data
    }
    callback(obj)
  })
}

export function getSecClassify(id, callback) {
  // secClass.findById('5b557ff9b6aa76268c4bf4f2').populate('firClssifyId').exec(function(err, data){
  //   console.log(data,11111,data.secClssifyId)
  // })
  if (!id) {
    let obj = {
      success: true,
      data: []
    }
    callback(obj)
    return
  }
  firClass.findById(id).populate('secClssifyId').exec(function (err, data) {
    if (err) {
      console.error(err)
    }
    let obj = {
      success: true,
      data: data.secClssifyId
    }
    callback(obj)
  })
}
export function getTirClassify(id, callback) {
  secClass.findById(id).populate('tirClssifyId').exec(function (err, data) {
    if (err) {
      console.error(err)
    }
    let obj = {
      success: true,
      data: data.tirClssifyId
    }
    callback(obj)
  })
}

export function updatefirClassify(req, callback) {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    const classifyInfo = JSON.parse(fields.form);
    console.log(classifyInfo)
    let imgUrl = "";
    const date = new Date()
    let model;
    new Promise((resolve, reject) => {
      //处理图片
      if (classifyInfo.removeList) {
        if (classifyInfo.level === 1) {
          model = firClass
        } else if (classifyInfo.level === 2) {
          model = secClass
        } else if (classifyInfo.level === 3) {
          model = tirClass
        }
        model.findById(classifyInfo.id, function (err, modelData) {
          modelData.pic = ''
          saveHandle(modelData)
        })
      }

      if (Object.values(files).length) {
        let imgPath = path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
        let imgList = ""
        const imgFile = files['0']
        createDir(date)
        fs.readFile(imgFile.path, function (err, data) {
          if (err) {
            console.error(err)
            return
          }
          const id = uuid()
          let type = imgFile.type.split('/')[1]
          fs.writeFile(imgPath + '/' + id + '.' + type, data, function (err, res) {
            if (err) {
              console.error(err)
            }
            imgUrl = `http://${serverUrl}/static/images/${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}/${id}.${type}`
            resolve(imgUrl)
          })
        })
      } else {
        //处理图片
        if (classifyInfo.level === 1) {
          model = firClass
        } else if (classifyInfo.level === 2) {
          model = secClass
        } else if (classifyInfo.level === 3) {
          model = tirClass
        }
        model.findById(classifyInfo.id, function (err, modelData) {
          imgUrl = modelData.pic
          resolve(imgUrl)
        })
      }
    }).then(imgUrl => {
      console.log(imgUrl, 111111, classifyInfo)
      if (classifyInfo.level === 1) {
        firClass.findById(classifyInfo.id, function (err, data) {
          if (!classifyInfo.firstClassify) {
            data.name = classifyInfo.name
            data.color = classifyInfo.color;
            data.sort = classifyInfo.sort;
            data.mobilename = classifyInfo.mobilename
            let obj = {
              success: true,
              message: '修改成功'
            }
            callback(obj)
            return
          }
          if (data.secClssifyId.length) {
            secClass.find({
              _id: {
                $in: data.secClssifyId
              }
            }).exec().then(data => {
              console.log(data, 1221)

              data.forEach(function (item) {
                console.log(item.tirClssifyId.length, classifyInfo.firClassify, 121)
                if (item.tirClssifyId.length && classifyInfo.firstClassify) {
                  console.log(1)
                  let obj = {
                    success: true,
                    message: '分类最多只能三级'
                  }
                  callback(obj)
                  return
                } else if (!item.tirClssifyId.length && classifyInfo.firstClassify) {
                  console.log(2)
                  if (classifyInfo.secClassify) {
                    let obj = {
                      success: true,
                      message: '分类最多只能三级'
                    }
                    callback(obj)
                    return
                  } else {
                    let addSecClass = new secClass({
                      firClssifyId: classifyInfo.firstClassify,
                      name: classifyInfo.name,
                      mobilename: classifyInfo.mobilename,
                      isShow: classifyInfo.isShow,
                      sort: classifyInfo.sort,
                      color: classifyInfo.color,
                      tirClssifyId: [],
                      pic: imgUrl
                    })
                    addSecClass.save(function (err, data) {
                      if (err) {
                        console.error(err)
                      }
                      let id = data['_id']
                      tirClass.create({
                        secClssifyId: data['_id'],
                        name: item.name,
                        mobilename: item.mobilename,
                        isShow: item.isShow,
                        sort: item.sort,
                        color: item.color,
                        pic: item.pic
                      }, function (err, tirClassData) {
                        secClass.findById(id, function (err, secClassData) {
                          if (err) {
                            console.log(err)
                          }
                          secClassData.tirClssifyId.push(tirClassData['_id'])
                          secClassData.save()
                        })
                        console.log(data, '修改成功')
                      })
                      secClass.remove({
                        _id: item['_id']
                      }, function (err, data) {
                        if (err) {
                          console.error(err)
                        }
                        console.log(item.name + '删除成功')
                      })


                      firClass.findById(classifyInfo.firstClassify, function (err, firClassData) {
                        if (err) {
                          console.error(err)
                        }
                        firClassData.secClssifyId.push(id)
                        firClassData.save()
                      })
                    })
                    firClass.remove({
                      _id: classifyInfo['id']
                    }, function (err, res) {
                      if (err) {
                        console.error(err)
                      }
                      console.log(res + '删除成功')
                    })
                  }
                }
              })
            })
          }
        })
      }
      if (classifyInfo.level === 2) {
        secClass.findById(classifyInfo.id, function (err, secClassData) {
          console.log(secClassData)
          if(!classifyInfo.firstClassify){
            let obj = {
              name: classifyInfo.name,
              mobilename: classifyInfo.mobilename,
              sort: classifyInfo.sort,
              color: classifyInfo.color,
              isShow: classifyInfo.isShow,
              pic: imgUrl,
              secClssifyId: []
            }
            // let createCall = function(data){
            //   console.log(`${data}why`)
            //   if(secClassData.tirClssifyId.length){
            //     secClassData.tirClssifyId.forEach(function(item, index){
            //       let findCall = function(findData){
            //         let obj = {
            //           name: findData.name,
            //           mobilename: findData.mobilename,
            //           sort: findData.sort,
            //           color: findData.color,
            //           isShow: findData.isShow,
            //           pic: findData.pic,
            //           firClssifyId: data['_id']
            //         }
            //         let createCall = function(creatData){
            //           data.secClssifyId.push(creatData['_id'])
            //           saveHandle(data)
            //           let deleteCall = function(data){
            //             console.log(JSON.stringify(data)+'删除成功')
            //           }
            //           deleteHandle(tirClass, item['_id'], deleteCall)
            //         }
            //         createClass(secClass, obj, createCall)
            //       }
            //       findbyId(tirClass,item['_id'], findCall)
            //     })
            //   }
            // }
            createClass(firClass, obj, function(data){
              console.log(`${data}why`)
              if(secClassData.tirClssifyId.length){
                secClassData.tirClssifyId.forEach(function(item, index){
                  let findCall = function(findData){
                    let obj = {
                      name: findData.name,
                      mobilename: findData.mobilename,
                      sort: findData.sort,
                      color: findData.color,
                      isShow: findData.isShow,
                      pic: findData.pic,
                      firClssifyId: data['_id']
                    }
                    let createCall = function(creatData){
                      data.secClssifyId.push(creatData['_id'])
                      saveHandle(data)
                      let deleteCall = function(data){
                        console.log(JSON.stringify(data)+'删除成功')
                      }
                      deleteHandle(tirClass, item['_id'], deleteCall)
                    }
                    createClass(secClass, obj, createCall)
                  }
                  findbyId(tirClass,item['_id'], findCall)
                })
              }
            })
            return
          }

          if (!classifyInfo.secClassify&& classifyInfo.firstClassify) {
            secClassData.name = classifyInfo.name;
            secClassData.sort = classifyInfo.sort
            secClassData.mobilename = classifyInfo.mobilename
            secClassData.color = classifyInfo.color
            secClassData.pic = imgUrl
            secClassData.isShow = classifyInfo.isShow
              if(classifyInfo.firstClassify!==secClassData.firClssifyId){
                let resCall = function(data){
                  secClassData.firClssifyId = classifyInfo.firstClassify
                  data.secClssifyId.push(secClassData.id)
                  saveHandle(data)
                  let changeInfo = () => {
                    let obj = {
                      success: true,
                      message: '修改成功'
                    }
                    callback(obj)
                  }
                  saveHandle(secClassData, changeInfo)
                }
                let changeId = function(data){
                  data.secClssifyId = data.secClssifyId.filter(function(item){
                      console.log(item, classifyInfo.id)
                      return item != secClassData.id
                  })
                  saveHandle(data)
                  // data.secClssifyId.forEach(function(item, index){
                  //   if(item === classifyInfo.id){
                  //     data.secClssifyId.s
                  //   }
                  // })
                }
                findbyId(firClass, secClassData.firClssifyId, changeId)
                findbyId(firClass, classifyInfo.firstClassify, resCall)
               
              }else{
                let resCall = () => {
                  let obj = {
                    success: true,
                    message: '修改成功'
                  }
                  callback(obj)
                }
                saveHandle(secClassData, resCall)
              }
            return
          }
          if (secClassData.tirClssifyId.length && classifyInfo.secClassify) {
            let obj = {
              success: true,
              message: '分类最多只能三级'
            }
            callback(obj)
            return
          } else if (!secClassData.tirClssifyId.length && classifyInfo.secClassify) {
            let obj = {
              name: classifyInfo.name,
              mobilename: classifyInfo.mobilename,
              sort: classifyInfo.sort,
              color: classifyInfo.color,
              isShow: classifyInfo.isShow,
              secClssifyId: classifyInfo.secClassify,
              pic: imgUrl
            }
            tirClass.create(obj, function (err, tirClassData) {
              if (err) {
                console.error(err)
              }
              let changeId = function(changeData){
                changeData.secClssifyId = changeData.secClssifyId.filter(function(item){
                  return item != secClassData['_id']
                })
                saveHandle(changeData)
              }
              findbyId(firClass, secClassData.firClssifyId, changeId)
              secClass.findById(classifyInfo.secClassify, function (err, secClassData) {
                secClassData.tirClssifyId.push(tirClassData['_id'])
                let callback = function () {
                  deleteHandle(secClass, {
                    _id: classifyInfo.id
                  })
                }
                saveHandle(secClassData, callback)
              })
            })
            return
          }
          
        })
      }
    })


  })
}