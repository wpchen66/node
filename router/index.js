let express = require('express')
let router = express.Router();

import * as route from '../dao/route';

router.get('/', function (req, res) {
  res.send('adasda')
})
router.post('/register',route.register)
router.post('/login', route.login)
router.get('/getGoodsList', route.getGoodsList)
export default router