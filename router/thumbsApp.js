const router = require('koa-router')();
const {
    getThumbsTotal,
    updateThumbs
} = require('../service/thumbs'); 

//获取app点赞总数
router.get("/api/getThumbsTotal", async (ctx, next) => {
    await getThumbsTotal(ctx);
})

//点赞app
router.post("/api/thumbsApp", async (ctx, next) => {
    let postParam = ctx.request.body //获取post提交的数据
    await updateThumbs(ctx, postParam)
})
module.exports = router;