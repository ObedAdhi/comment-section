const { getDatabase } = require("../config/mongoDB")
const commentDB = getDatabase().collection("comments")

class Comment {
  static create (comment) {
    return commentDB.insertOne(comment)
  }

  static findAll () {
    return commentDB.find().toArray()
  }
}

module.exports = Comment
