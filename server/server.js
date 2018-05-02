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

const db = {};
mongoose.connect('mongodb://localhost:27017/connected', function() { /* dummy function */ })
    .then(() => {
      console.log('Connected to database');
    })
    .catch(err => { // mongoose connection error will be handled here
        console.error('Coudld not connect to database');
        process.exit(1);
    });

routes(app)

//clear db
const Posts = require('./models/Posts')
async function rmv () {
  await Posts.remove()
}
//rmv()

const port = 8000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});