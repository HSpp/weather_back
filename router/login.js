const router = require('koa-router')();
const {
    userLoginService,
    platformLogin
} = require('../service/login'); //获取用户列表
//第三方用户登录
router.post("/api/platformLogin", async (ctx, next) => {
    let postParam = ctx.request.body
    await platformLogin(ctx,postParam,next);
})

//用户登录
router.post("/api/userLogin", async (ctx, next) => {
    let postParam = ctx.request.body //获取post提交的数据
    await userLoginService(ctx, postParam)
})

module.exports = router;