const router = require("express").Router()
const CommentController = require("../controllers/commentController")

router.post("/", CommentController.create)
router.get("/", CommentController.getAll)
// router.get("/users/:id", UserController.findOne)

module.exports = router