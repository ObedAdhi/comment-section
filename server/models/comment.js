const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoDB")
const commentDB = getDatabase().collection("comments")

class Comment {
  static create (comment) {
    return commentDB.insertOne(comment)
  }

  static findAll () {
    return commentDB.find().toArray()
  }

  static findOne (commentId) {
    const id = {"_id": ObjectId(commentId)}
    return commentDB.findOne(id)
  }

  static updateOne(commentId, commentValue) {
    const id = {"_id": ObjectId(commentId)}
    const newData = {$set: commentValue}
    return commentDB.updateOne(id, newData)
  }

  static delete (commentId) {
    const id = {"_id": ObjectId(commentId)}
    return commentDB.deleteOne(id)
  }
}

module.exports = Comment
