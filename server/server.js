const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/connected', function(err, db) {
    if (err) {
        console.log('Unable to connect to database. Error:', err);
    } else {
        console.log('Connected to Database');
    }
});
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
  console.log('Server started on port ' + port);
});