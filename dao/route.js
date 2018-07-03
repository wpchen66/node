import {userModel} from './collection.js'
import { Model } from 'mongoose';
import * as db from './operation.js'
export function register(req, res) {
  console.log(1)
  const username = req.body.username
  const mobile = req.body.mobile
  const password = req.body.password
  const nickname = req.body.nickname
  function callback(result) {
    res.send(result)
  }
  db.addUser({username, mobile, password, nickname}, callback)
}

export function login(req, res) {
  const username = req.body.username
  const password = req.body.password
  const mobile = req.body.username
  function callback (result) {
    res.send(result)
  }
  db.queryUser({username, password, mobile}, callback)
}