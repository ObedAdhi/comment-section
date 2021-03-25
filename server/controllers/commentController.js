const Comment = require("../models/comment")

class CommentController {
  static async create (req, res, next) {
    try {
      const { commentValue } = req.body

      if (!commentValue || commentValue === "") {
        return next({ name: "EMPTY_COMMENT" })
      }

      const { email, name } = req.user
      const createdAt = new Date()
  
      const comment = {
        commentValue, email, name, createdAt
      }
      const response = await Comment.create(comment)

      res.status(201).json(response.ops[0])

    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  
  static async getAll (req, res, next) {
    try {
      const comments = await Comment.findAll()
      res.status(200).json(comments)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = CommentController