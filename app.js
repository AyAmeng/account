const Koa = require('koa');
const app = new Koa();

const router = require('loa-router')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let fs = require('fs');
app.use(ctx => {
  ctx.body = 'Hello Koa'
});

app.listen(3000, ()=> {
  console.info('server is running at port 3000')
});