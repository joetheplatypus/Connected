const PostController = require('./controllers/PostController');
const AuthController = require('./controllers/AuthController');
const ProfileController = require('./controllers/ProfileController');
const UserController = require('./controllers/UserController');

//checks for login, if not sends error
const CheckToken = require('./middleware/CheckToken')

module.exports = function(app) {
  //Posts
  app.get('/posts', PostController.index)
  app.get('/posts/:postId', PostController.get)
  app.post('/posts', CheckToken, PostController.post)
  app.put('/posts/:postId', CheckToken, PostController.put)
  app.delete('/posts/:postId', CheckToken, PostController.delete)

  //Authentication
  app.post('/login', AuthController.login)
  app.post('/register', AuthController.register)

  //Current User Profile
  app.get('/profile', CheckToken, ProfileController.info)
  app.put('/profile', CheckToken, ProfileController.put)
  app.delete('/profile', CheckToken, ProfileController.delete)

  //Users
  app.get('/users', UserController.index)
  app.get('/users/:userId', UserController.get)
}