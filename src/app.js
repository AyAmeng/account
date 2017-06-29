const Koa     = require('koa');
const app     = new Koa();
const Router  = require('koa-router')
const path    = require('path');
const favicon = require('serve-favicon');
const logger  = require('morgan');

const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const views        = require('koa-views')

const router = new Router()

app.use(views(__dirname + '/views', {
  // map: {
  //   // html: 'underscore'
  // }
}))



router.get("/", ctx =>  {
  return ctx.render('./index.html')
  .catch(err => {
    console.info(err)
  })
})

app.use(router.routes())
  .use(router.allowedMethods());

app.on("error",(err,ctx)=> {
  console.log('error', err)
})
app.listen(3000, ()=> {
  console.info('server is running at port 3000')
});