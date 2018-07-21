let express = require('express')
let router = express.Router();

import * as route from '../dao/route';

router.get('/', function (req, res) {
  res.send('adasda')
})
router.post('/register',route.register)
router.post('/login', route.login)
router.post('/addGoods', route.addGoods)
router.get('/getGoodsList', route.getGoodsList)
router.post('/updataGoods', route.updataGoods)
router.post('/addClassify', route.addClassify)
router.get('/getFirClassify', route.getFirClassify)
router.get('/getSecClassify', route.getSecClassify)
export default router