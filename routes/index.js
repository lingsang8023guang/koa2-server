// const router = require('koa-router')()
import Router from 'koa-router'
import { queryLogin, saveUserInfo } from '../db/userMiddleWare'

const router = new Router();
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/login', async (ctx, next) => {
  var
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';

      let dataObj = await queryLogin(name, password);
      console.log(dataObj, '--dataObj')

      ctx.response.body = dataObj;
      console.log(`signin with name: ${name}, password: ${password}`);
});

// 注册
router.post('/register', async (ctx, next) => {
  // console.log(ctx.request.body, '--body');
  var
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '',
      phone = ctx.request.body.phone || '',
      confirmPassword = ctx.request.body.confirmPassword || '';

      let saveInfoResponse = await saveUserInfo(ctx.request.body);
      ctx.response.body = saveInfoResponse;
});

export default router
// module.exports = router
