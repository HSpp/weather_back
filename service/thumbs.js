const query = require('../config/connection');
async function getThumbsTotal(ctx) {
    let sql = 'select count(*) as total from thumbs_app'
    try {
        let data = await query(sql)
        ctx.body = {
            success:true,
            total:data[0]['total']
        }
    } catch (err) {
        ctx.body = {
            "success": false,
            "msg": err
        };
    }
    
}
async function updateThumbs(ctx, params) {
    let sql = `insert into thumbs_app values('${params.openid}',now())`;
    try {
        let data = await query(sql)
        ctx.body = {
            "success": true,
            "msg": '点赞成功！！'
        };
    } catch (err) {
        ctx.body = {
            "success": false,
            "msg": err
        };
    }

}
async function isThumbsed(openid) {
    let sql = `select openid from thumbs_app where openid='${openid}'`;
    try {
        let rows = await query(sql);
        return rows.length > 0 ? {
            isExist: true,
            err: false
        } : {
            isExist: false,
            err: false
        };
    } catch (err) {
        return {
            err: err
        }
    }
}
module.exports = {
    getThumbsTotal,
    updateThumbs

}