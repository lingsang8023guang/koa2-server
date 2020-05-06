// const router = require('koa-router')()
import Router from 'koa-router'

const router = new Router();
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/login', async (ctx, next) => {
  console.log(ctx.request.body);
  var
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
      console.log(`signin with name: ${name}, password: ${password}`);
      if (name === 'koa' && password === '12345') {
          ctx.response.body = {
              status: 200,
              code: '000',
              message: '登录成功',
              data: {},
          }
      } else {
          ctx.response.body = {
              status: 200,
              message: '用户名或密码设置错误'
          }
      } 
});
export default router
// module.exports = router
