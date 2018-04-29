const PostController = require('./controllers/PostController');
const AuthController = require('./controllers/AuthController');
const ProfileController = require('./controllers/ProfileController');

const CheckToken = require('./middleware/CheckToken')

module.exports = function(app) {
  //Posts
  app.get('/posts', PostController.index)
  app.get('/posts/:postId', PostController.get)
  app.post('/posts', PostController.post)
  app.put('/posts/:postId', PostController.put)
  app.delete('/posts/:postId', PostController.delete)

  //Authentication
  app.post('/login', AuthController.login)
  app.post('/register', AuthController.register)

  //Current User Profile
  app.get('/me', CheckToken, ProfileController.info)

  //Users
}