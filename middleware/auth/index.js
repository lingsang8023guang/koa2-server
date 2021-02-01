/**
 * 权限判断的中间件
 * 中间件是个async function(ctx, next) { await next() }
 */
import { SERVICE_AUTH_WHITELIST } from '../../common/env'

 export default function() {
     return async function authMiddleWare(ctx, next) {
        const { request } = ctx;
        const path = request.url; // /login
        const token = request.header['access-token']
        // console.log(ctx, '--ctx')
        let needVerifyToken = true
        // TODO:白名单不做校验token
        SERVICE_AUTH_WHITELIST.forEach((item) => {
            if (item instanceof RegExp) {
                if (item.test(request.url)) {
                    needVerifyToken = false
                }
            } else if (item === request.url) {
                needVerifyToken = false
            }
        })
        // console.log(needVerifyToken, '--needVerifyToken')
        await next();
     }
 }