const query = require('../config/connection');
//获取评论总条数
async function getCommentsTotal(ctx) {
    let sql = 'select count(*) as total from comments_table'
    try {
        let rows = await query(sql);
        ctx.body = {
            success: true,
            total: rows[0]['total']
        }

    } catch (err) {
        ctx.body = {
            success: false,
            msg: err
        }
    }
}
//获取评论列表

async function comments_lists(ctx, params, next) {
    let sql = `SELECT * from  (SELECT c.*, p.nickname c_nickname,p.avatarUrl c_avatar FROM comments_table c,platform_user p WHERE
                c.openid = p.openid LIMIT 0,9) as co LEFT JOIN  (SELECT r.*, p.nickname r_nickname,p.avatarUrl r_avatar FROM reply_table r,
                platform_user p WHERE r.replyid = p.openid) as re  ON co.commentmsgid=re.replycommentsid`;
    try {
        let rows = await query(sql);
        let comments=[],reply=[]
        rows.map(row=>{
            comments.push({
                c_avatar:row.c_avatar,
                c_nickname:row.c_nickname,
                commentTime:row.commentTime,
                commentmsgid:row.commentmsgid,
                thumbs:row.thumbsTotal,
                content:row.content,
                location:row.location,
                reply:[]
            })
            if(row.replyid){
                reply.push({
                    r_nickname:row.r_nickname,
                    replycontent:row.replycontent,
                    replycommentsid:row.replycommentsid
                })
            }    
        })
        comments=unique(comments)
        comments.map(ele=>{
            reply.map(item=>{
                if(ele.commentmsgid==item.replycommentsid){
                    ele.reply.push(item)
                }
            })
        })
        ctx.body = {
            success: true,
            data: comments
        }
    } catch (err) {
        ctx.body = {
            success: false,
            msg: err
        }
    }
}
//去重
function unique(arr){
    let set=new Set();
    for(let i=0;i<arr.length;i++){
        set.add(JSON.stringify(arr[i]))
    }
    return Array.from(set).map(ele=>JSON.parse(ele))
}
/*
async function comments_lists(ctx, params, next) {
    let sql = `SELECT p.nickname c_nickname,p.avatar c_avatar,c.* FROM comments_table c, platform_user p WHERE p.openid=c.openid order by c.commentTime desc`;
    try {
        let rows = await query(sql);
        let result=await queryReply(rows);
        ctx.body = {
            success: true,
            data: result
        }

    } catch (err) {
        ctx.body = {
            success: false,
            msg: err
        }

    }
}
async function queryReply(message) {
    let result = [];
    if (message.length > 0) {
        for (let i = 0; i < message.length; i++) {
            let id = message[i]['commentmsgid'];
            let sql_reply = `select p.nickname r_nickname,p.avatar r_avatar,r.* from reply_table r,platform_user p 
                        where r.replycommentsid='${id}' and r.replyid=p.openid`;
            try {
                let reply = await query(sql_reply);
                let r = Object.assign(message[i], {
                    reply: reply
                })
                result.push(r)
            } catch (err) {
               return err;
            }
        }
        return result
    }

}
*/

//获取回复列表
async function reply_lists(ctx, params, next) {

}
//发送评论
async function setComment(ctx, params, next) {
    let sql = `insert into comments_table values(null,'${params.openid}',now(),0,'${params.content}','${params.location}')`;
    try {
        let rows = await query(sql);
        ctx.body = {
            success: true,
            msg: '评论成功！！'
        }
    } catch (err) {
        ctx.body = {
            success: false,
            msg: err
        }
    }
}
//回复评论
async function replyComment(ctx, params, next) {
    let sql = `insert into reply_table values(null,'${params.replycommentsid}',now(),'${params.replycontent}','${params.replyid}')`;
    try {
        let rows = await query(sql);
        ctx.body = {
            success: true,
            msg: '回复成功！！'
        }
    } catch (err) {
        ctx.body = {
            success: false,
            msg: err
        }
    }

}
//评论点赞
async function comments_thumbs(ctx, params, next) {
    let result = await isthumbs(params)
    if (result.err) {
        ctx.body = {
            success: false,
            msg:err
        }
    } else if(!result.isExist){
        let sql = `insert into thumbs_comments values('${params.commentmsgid}','${params.commentmsgid}',now())`
        let sql2 = `update comments_table set thumbsTotal=thumbsTotal+1 where commentmsgid='${params.commentmsgid}'`
        try {
            await query(sql);
            await query(sql2);
            ctx.body = {
                success: true,
                msg: '点赞成功！'
            }

        } catch (err) {
            ctx.body = {
                success: false,
                err: err
            }

        }
    }else{
        ctx.body = {
            success: false,
            msg: '不可多次点赞！'
        }
    }

}
//此条评论是否已点赞
async function isthumbs(params) {
    let sql = `select * from thumbs_comments where commentmsgid='${params.commentmsgid}'`
    try {
        let rows = await query(sql);
        return rows.length > 0?{err:null,isExist:true}:{err:null,isExist:false};

    } catch (err) {
        return {err:err};
    }
}
module.exports = {
    getCommentsTotal,
    setComment,
    comments_thumbs,
    comments_lists,
    replyComment
}