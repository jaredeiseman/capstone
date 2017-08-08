const express = require('express');
const router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;

//Setup database connections
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo connected');
});

//Setup schema
var postSchema = mongoose.Schema({
  created: String,
  title: String,
  category: String,
  contents: String,
  tags: Array,
  draft: Boolean
})

var Post = mongoose.model('Post', postSchema);

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean
});

var User = mongoose.model('User', userSchema);

router.post('/createuser', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err) { res.status(500); res.send(err); }
    var newUser = new User({
      username: req.body.username,
      password: hash,
      isAdmin: req.body.isAdmin
    }).save((err) => {
      if (err) { res.status(500); res.send(err); }
      res.status(200);
      res.send('done');
    });
  });
});

router.post('/login', (req, res) => {
  var permissions = undefined;
  User.find({username: req.body.username}, (err, user) => {
    if (err) { res.status(500); }
    if (user.length === 0) {
      res.status(500);
      res.send('no matching user');
    } else {
      bcrypt.compare(req.body.password, user[0].password, (err, check) => {
        if (check) {
          res.status(200);
          if (user[0].isAdmin) {
            permissions = 'admin';
          } else {
            permissions = 'user';
          }
          res.send(permissions);
        } else {
          res.status(500);
          res.send('failed to validate');
        }
      });
    }
  });
});

/* GET all published posts */
router.get('/allposts', (req, res) => {
  Post.find({draft: false}, (err, posts) => {
    if (err) { res.send(err); console.log(err); }
    res.status(200);
    res.json(posts);
  });
});

/* Get all drafts */
router.get('/alldrafts', (req, res) => {
  Post.find({draft: true}, (err, posts) => {
    if (err) { res.send(err); console.log(err); }
    res.status(200);
    res.json(posts);
  });
});

/* GET one post by id */
router.get('/post/:id', (req, res) => {
  Post.findById({_id: req.params.id}, (err, post) => {
    if (err) { res.send(err); console.log(err); }
    res.status(200);
    res.json(post);
  });
});

router.post('/create', (req, res) => {
  new Post(req.body).save(function(e) {
    if (e) {
      console.log(e);
    } else {
      res.status(200);
      res.send('done');
    }
  });
});

router.post('/update/:id', (req, res) => {
  Post.update({_id: req.params.id}, req.body, (err, data) => {
    if (err) { res.send(err); console.log(err); }
    res.status(200);
    res.send('done');
  });
});

router.get('/delete/:id', (req, res) => {
  console.log(req.params);
  Post.find({_id: req.params.id}).remove(() => {
    res.status(200);
    res.send('done');
  });
});

module.exports = router;
