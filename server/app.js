const Koa     = require('koa');
const app     = new Koa();

const path    = require('path');
const favicon = require('serve-favicon');
const logger  = require('morgan');

const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const views        = require('koa-views')

// const defaultRouter = require('./routers/index.js').default
// const pageRouter = require('./routers/index.js').page
const router = require('./routers/index.js')
// 设置views根rootpath
app.use(views(__dirname + './views', {
  // map: {
  //   // html: 'underscore'
  // }
})),
// console.info(defaultRouter),
// app.use(defaultRouter.routes())
//   .use(pageRouter.routes())
//   .use(defaultRouter.allowedMethods())
//   .use(defaultRouter.allowedMethods()),

app.use(router.routes())
  .use(router.allowedMethods())

app.on("error",(err,ctx)=> {
  console.log('error', err)
}),
app.listen(3000, ()=> {
  console.info('server is running at port 3000 http://localhost:3000')
})