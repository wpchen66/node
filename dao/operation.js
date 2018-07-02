import {userModel} from './collection.js'
import { Model } from 'mongoose';



userInfo.save(function(err, res) {
  if(err) {
    console.error(err)
    return
  }
console.log('success:'+ res)
})