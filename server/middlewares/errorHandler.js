function errorHandler(err, req, res, next) {
  if (err) {
    switch (err.name) {
      case "NOT_LOGGED_IN":
        return res.status(401).json({
          message: "Please Log in First!"
        })

      case "NOT_FOUND":
        return res.status(404).json({
          message: "Page Not Found"
        })
    
      default:
        return res.status(500).json({
          message: "Internal Server Error"
        })
    }
  }
}

module.exports = errorHandler