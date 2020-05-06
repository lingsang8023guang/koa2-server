// const router = require('koa-router')()
import Router from 'koa-router'

const router = new Router();

// 路径是/users下面的子路由
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
