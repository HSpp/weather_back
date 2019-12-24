SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `platform_user`;
//用户表
create table platform_user(
    `openid` varchar(100) not null PRIMARY KEY COMMENT 'openid',
    `nickname` varchar(50) not null DEFAULT '' COMMENT '昵称',
    `platform` varchar(12) NOT null DEFAULT '' COMMENT '平台',
    `createtime` datetime NOT null DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `avatarUrl` varchar(200) not null DEFAULT '' COMMENT '头像'
)DEFAULT CHARSET=utf8;
DROP TABLE IF EXISTS `thumbs_app`;
//应用点赞表
create table thumbs_app(
    `openid` varchar(100) not null PRIMARY KEY COMMENT 'openid',
    `thumbsTime` datetime NOT null DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间'
)
DROP TABLE IF EXISTS `comments_table`;
//评论表

create table comments_table(
    `commentmsgid` int(4) not null AUTO_INCREMENT PRIMARY KEY COMMENT '评论消息ID',
    `openid` varchar(100) not null DEFAULT '' COMMENT 'openid',
    `commentTime` datetime NOT null DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
    `thumbsTotal` smallint NOT NULL DEFAULT 0 COMMENT '点赞总数',
    `content` varchar(500) not null DEFAULT '' COMMENT '评论内容',
    `location` varchar(10) not null DEFAULT '' COMMENT '位置'
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;
DROP TABLE IF EXISTS `reply_table`;
//评论回复表
create table reply_table(
    `replymsgid` int(4) not null AUTO_INCREMENT PRIMARY KEY  COMMENT '这条评论ID',
    `replycommentsid` varchar(100) not null  DEFAULT '' COMMENT '回复哪条消息=>comments_table.commentmsgid',
    `replytime` datetime not null DEFAULT CURRENT_TIMESTAMP COMMENT '回复时间',
    `replyid` varchar(100) NOT null COMMENT '谁回复的=>platform_user.openid',
    `replycontent` varchar(500) not null DEFAULT '' COMMENT '回复内容' 
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;
DROP TABLE IF EXISTS `thumbs_comments`;
//评论点赞表
create table thumbs_comments(
    `commentmsgid` int(4) not null AUTO_INCREMENT PRIMARY KEY COMMENT '评论消息ID',
    `openid` varchar(100) not null  COMMENT '被点赞者id',
    `thumbsTime` datetime NOT null DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间'
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;



[
    {
        nickname:'',
        avatarUrl:'',
        thumbs:'',
        location:'',
        commentTime:'',
        content:'',
        reply:[
            {
                nickname:'',
                avatarUrl:'',
                content:''
            }
        ]
    },
    {
        nickname:'',
        avatarUrl:'',
        thumbs:'',
        location:'',
        commentTime:'',
        content:'',
        reply:[
            {
                nickname:'',
                avatarUrl:'',
                content:''
            }
        ]
    }
]