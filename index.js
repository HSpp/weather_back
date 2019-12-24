const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('koa2-cors');
const login = require('./router/login');
const thumbsApp = require('./router/thumbsApp');
const comments = require('./router/comments');
app.use(cors());
app.use(bodyParser())
app.use(json());
app.use(login.routes(), login.allowedMethods())
app.use(thumbsApp.routes(), thumbsApp.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())
app.listen(3000);