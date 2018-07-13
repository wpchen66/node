const jwt = require('jsonwebtoken')
const path = require('path')
export function verifyjwt (token,code ,callback) {
  jwt.verify(token,code ,function (err, success) {
      if(err) {
        
        let obj = {
          time: true,
          message: 'token超时'
        }
        callback(obj)
        console.error(err)
        return 
      }
    let decode = jwt.decode(token, {complete: true})
    callback(decode)
    return
  })
}