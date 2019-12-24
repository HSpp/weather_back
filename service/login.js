const query = require('../config/connection');
let https = require('https');

//用户登录
async function userLoginService(ctx, params) {
    let sql = `SELECT * FROM sys_user where userName= '${params.userName}' and password= '${params.password}'`;
    try {
        let data = await query(sql)
        ctx.body = {
            "success": true,
            "data": data
        };
    } catch (error) {
        ctx.body = {
            "success": false,
            "message": error
        };
    }
}
//
//三方平台登录(微信)
async function platformLogin(ctx, params,next) {
    //查看库中有无记录,没有插入库中
    let result = await getOpenId(params.code)
    if (result.openid) {
        let sql = `SELECT openid,nickname as nickName,platform,createtime,avatarUrl FROM platform_user where openid= '${result.openid}'`;
        let zan=await isZan(ctx,result.openid,next)
        let data = await query(sql)
        if (data.length > 0) {
            ctx.body = {
                "success": true,
                "data": Object.assign(data[0],{isZan:zan}) 
            }
        } else {
            await addUser(ctx, Object.assign(params, {
                openid: result.openid,
                isZan:false
            }))
        }
    } else {
        ctx.body = {
            "error": true,
            "msg": '登录失败'
        }

    }



}


async function getOpenId(code) {
    const Appid = 'wxa7c88de118523478';
    const AppSecret = 'cb302907f0d9edd14d33c4b339bc358d';
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${Appid}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`;
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (d) => {
                data += d;
            });
            res.on('end', function () {
                resolve(JSON.parse(data))
            })
        }).on('error', (e) => {
            reject(e)
        });
    })
}

async function addUser(ctx, params) {
    let sql = `insert into platform_user  values('${params.openid}','${params.nickName}','${params.platform}',now(),'${params.avatarUrl}');`;
    try {
        let data = await query(sql);
        ctx.body = {
            "success": true,
            "data":params
        }
    } catch (error) {
        ctx.body = {
            "success": false,
            "message": error
        }
    }
}
//判断当前用户是否点赞过
async function isZan(ctx,openid,next){
    let sql=`select openid from thumbs_app where openid='${openid}'`;
    try{
        let rows=await query(sql);
        return rows.length>0
    }catch(err){
        ctx.body={
            success:false,
            msg:err
        }
        next();
    }
}
module.exports = {
    userLoginService,
    platformLogin
};