const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
export function verifyjwt(token, code, callback) {
  jwt.verify(token, code, function (err, success) {
    if (err) {

      let obj = {
        time: true,
        message: 'token超时'
      }
      callback(obj)
      console.error(err)
      return
    }
    let decode = jwt.decode(token, {
      complete: true
    })
    callback(decode)
    return
  })
}
export function createDir(date) {
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
}

export function saveClass(Classify, classifyInfo, imgUrl, callback){
  let {name, mobilename, sort, isShow, color} = classifyInfo;
  const firkind = new Classify({
    _id: new mongoose.Types.ObjectId(),
    name,
    mobilename,
    sort,
    isShow,
    color,
    pic: imgUrl
  })
  firkind.save(function(err, data){
    if(err){
      console.error(err)
    }
    let obj ={
      success: true,
      message: '一级分类保存成功'
    }
    callback(obj)
    console.log(data, '一级分类保存成功')
  })
}
export function saveSecClass (Classify, classifyInfo, imgUrl,callback ,superior) {
  let {name, mobilename, sort, isShow, color, firstClassify} = classifyInfo;
  const firkind = new Classify({
    firClssifyId: firstClassify,
    name,
    mobilename,
    sort,
    isShow,
    color,
    pic: imgUrl
  })
  firkind.save(function(err, res){
    if(err){
      console.error(err)
    }
    let obj ={
      success: true,
      message: '二级分类保存成功'
    }
    callback(obj)
    console.log(res, '二级分类保存成功')
    if(superior){
      superior.findById(firstClassify, function(err, data){
        if(err){
          console.error(err)
        }
        data.secClssifyId.push(res['_id'])
        data.save(function(err, data){
          console.log(data,'一级联系成功')
        })
      })
    }
  })
 
}
export function saveTirClass (Classify, classifyInfo, imgUrl,callback, superior) {
  let {name, mobilename, sort, isShow, color, secClassify} = classifyInfo;
  const firkind = new Classify({
    secClssifyId: secClassify,
    name,
    mobilename,
    sort,
    isShow,
    color,
    pic: imgUrl
  })
  firkind.save(function(err, res){
    if(err){
      console.error(err)
    }
    let obj ={
      success: true,
      message: '三级分类保存成功'
    }
    callback(obj)
    console.log(res, '三级分类保存成功')
    if(superior){
      superior.findById(secClassify, function(err, data){
        if(err){
          console.error(err)
        }
        data.tirClssifyId.push(res['_id'])
        data.save(function(err, data){
          console.log(data,'二级联系成功')
        })
      })
    }
  })
}

export function saveHandle(obj, callback){
 obj.save(function(err, data){
  if(err){
    console.error(err)
  }
  console.log(data)
  if(callback){
    callback()
  }
 })
}

export function deleteHandle(model, obj, callback){
  model.remove(obj, function(err, data){
    console.log(data)
    if(callback){
      callback(data)
    }
  })
}

export function findbyId(model,id ,callback){
  model.findById(id, function(err, data){
    if(err){
      console.error(err)
    }
    callback(data)
  })
}

export function createClass(model, config, callback){
  model.create(config, function(err, data){
    if(err){
      console.error(err)
    }
    console.log(`创建${data}成功`)
    if(callback){
      console.log(123)
      callback(data)
    }
  })
}

export function createNew (Model, config, callback) {
  let newModel = new Model(config)
  newModel.save(function(err, data){
    if(err){
      console.error(err)
    }
    console.log(data,11111111111111111, callback)
    if(callback){
      callback(data)
    }
  })
}

export function find(Model, config, callback){
  Model.find(config, function(err, data){
    if(err){
      console.error(err)
    }
    if(callback){
      callback(data)
    }
  })
}

// export function mapFind(arr,mark){
//   if(arr){
//     arr.forEach(item => {
//       if(item[mark].length){

//       }
//     })
//   }
// }