const Router  = require('koa-router')
const router = new Router()

router.get("/", ctx =>  {
  return ctx.render('./index.html')
  .catch(err => {
    console.info(err)
  })
})
module.exports = router
