const router = require("express").Router()
const userRouter = require("./userRouter")
const commentRouter = require("./commentRouter")
const { authentication } = require("../middlewares/auth")

router.use(userRouter)
router.use(authentication)
router.use("/comments", commentRouter)

module.exports = router