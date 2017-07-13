const Router  = require('koa-router')
const router = new Router()

router.get("/page", ctx =>  {
  return ctx.render('./page.html')
  .catch(err => {
    console.info(err)
  })
})
module.exports = router
