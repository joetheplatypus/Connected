const PostController = require('./controllers/PostController');

module.exports = function(app) {
  app.get('/posts', PostController.index)
  app.get('/posts/:postId', PostController.get)
  app.post('/posts', PostController.post)
  app.put('/posts/:postId', PostController.put)
  app.delete('/posts/:postId', PostController.delete)
}