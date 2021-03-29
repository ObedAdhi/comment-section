# Comment Section 
This is a comment section simulation in a social media.
User can register and comment to a pre-made post / article.
User can reply to a comment too.

## API Path / Route
|Verb |Path |Description |
|---|---|---|
|POST |/register | Create new user account  |
|POST |/login | Login to registered user account   |
|POST |/comments | Create new comment   |
|GET |/comments | Get all comments   |
|PUT |/comments/:commentId | Edit a comment   |
|DELETE |/comments/:commentId | Delete a comment   |
|POST |/replies | Create a reply to a comment   |
|GET |/replies | Get all replies   |
|PUT |/replies/:replyId | Edit a reply   |
|DELETE |/replies/:replyId | Delete a reply   |



## Note
- I assume that this comment function is similiar as general social media comment section, so user must be registered and logged in to comment
- I assume it's not allowed to reply a reply (only allowed reply to comment)
- Create ".env" file inside server directory and insert "SECRET_KEY=secret" (without quotation mark)
- To run server, cd to server dir and run $ npm run dev
- To run client, cd to client dir and run $ npm run serve

## Progress log
### Commit 1
- Added bcryptjs hash and compare function
- Added jsonwebtoken generate token and verify token
- Added .env file and secret for jwt
- Added Error handler
- Added Router for user
- Added mongoDB config file
- Added app.js express, port, router, error handler
### Commit 2
- Added User register and login
- Added hashing User password in User model
- Added access_token after register and login
- Added User authentication middleware
- Added Comment create and read all
- Edited errorHandler, adding more error case
### Commit 3
- Added Comment update and delete
- Added comment authorization for update and delete
- Added Axios to client
- Edited errorHandler, adding unauthorized error case
### Commit 4
- Added Reply CRUD
- Added Reply authorization for update and delete
- Edited Comment Controller to show complete data of comment and replies to that comment
### Commit 5
- Added axios helper
- Added login / register page
- Added Navbar
- Connecting login and register page to backend server
### Commit 6
- Added Post views to display comment section
- Connecting Post views to backend server
- Added Comment component (template)
- Added Reply component (template)
- Displaying all comments with it's replies
- Fix register output from models
### Commit 7
- Added create comment function
- Added comment text field input
- Added delete function for comment and reply
- Added CommentCard for looping
- Added ReplyCard for looping
