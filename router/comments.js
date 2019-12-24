const router = require('koa-router')();
const {
    getCommentsTotal,
    setComment,
    comments_thumbs,
    comments_lists,
    replyComment
} = require('../service/comments'); 
router.get('/api/getCommentsTotal',async (ctx,next)=>{
    await getCommentsTotal(ctx)
})
router.post('/api/setComment',async (ctx, next) =>{
    let params=ctx.request.body ;
    await setComment(ctx,params,next)
})
router.post('/api/thumbsComment',async (ctx,next) => {
    let params=ctx.request.body ;
    await comments_thumbs(ctx,params,next)
})
router.post('/api/comments_lists',async (ctx,next)=>{
    let params=ctx.request.body ;
    await comments_lists(ctx,params,next)

})
router.post('/api/replySomeone',async (ctx,next)=>{
    let params=ctx.request.body ;
    await  replyComment(ctx,params,next)
})
module.exports = router;


