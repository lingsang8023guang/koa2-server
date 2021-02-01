// node服务-登录验证校验的白名单
export const SERVICE_AUTH_WHITELIST = [
    '/health',
    '/logout',
    '/register',
    '/login',
    // /\/api\/.+/,
    /\/reset(pwd)?$/,
    /\.(html|htm|js|css|png|gif|svg|eot|ttf|woff|woff2|map|ico)$/,
]