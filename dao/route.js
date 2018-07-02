export function register(req, res) {
  const username = req.body.username
  const mobile = req.body.mobile
  const password = req.body.password
  const nickname = req.body.nickname
  res.send('hello')
}