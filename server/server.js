const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

mongoose.connect('mongodb://localhost:27017/connected');
var db = mongoose.connection

routes(app)

//clear db
const Posts = require('./models/Posts')
async function rmv () {
  await Posts.remove()
}
rmv()

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});