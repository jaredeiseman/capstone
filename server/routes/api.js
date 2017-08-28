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
  title: {
    type: String,
    unique: true
  },
  category: String,
  contents: String,
  tags: Array,
  draft: Boolean,
  author: String,
  comments: Array
})

var Post = mongoose.model('Post', postSchema);

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  password: String,
  isAdmin: Boolean,
  email: String
});

var User = mongoose.model('User', userSchema);

var pagesSchema = mongoose.Schema({
  title: String,
  route: {
    type: String,
    unique: true
  },
  contents: String,
  displayName: {
    type: String,
    unique: true
  },
  displayInNav: Boolean
});

var Pages = mongoose.model('Pages', pagesSchema);

var masterConfigSchema = mongoose.Schema({
  siteTitle: String
}, { collection: 'masterconfig'});

var MasterConfig = mongoose.model('masterconfig', masterConfigSchema);

router.get('/masterconfig', (req, res) => {
  MasterConfig.find({}, (err, config) => {
    if (err) { res.send(err); }
    res.json(config);
  });
});

router.post('/masterconfig', (req,res) => {
  MasterConfig.find({}, (err, config) => {
    if (err) { res.send(err); }
    MasterConfig.update({_id: config[0]._id}, req.body, (err, data) => {
      if (err) { res.send(err); }
      res.send('success');
    });
  })
});

router.post('/deletepage', (req, res) => {
  Pages.find({_id: req.body['_id']}).remove(() => {
    res.send('done');
  });
});

router.post('/page/update', (req,res) => {
  Pages.update({_id: req.body._id}, req.body, (err, data) => {
    if (err) { res.send(err); }
    res.send('success');
  });
});

router.get('/page/edit/:id', (req,res) => {
  Pages.find({_id: req.params.id}, (err, page) => {
    if (err) { res.send(err); return; }
    res.json(page);
  });
});

router.post('/createpage', (req,res) => {
  new Pages({
    title: req.body.title,
    contents: req.body.contents,
    route: req.body.route,
    displayName: req.body.displayName,
    displayInNav: req.body.displayInNav
  }).save((err) => {
    if (err) { res.status(500); res.send(err); }
    res.send('done');
  });
});

router.get('/page/:route', (req,res) => {
  Pages.find({route: req.params.route}, (err, page) => {
    if (err) { res.send(err); return; }
    if (page.length !== 0) {
      res.json(page);
    } else {
      res.send('page not found');
    }
  })
});

router.get('/listpages', (req,res) => {
  Pages.find({}, (err, pages) => {
    // if (pages.length === 0) {
    //   new Pages({
    //     title: 'Welcome',
    //     contents: 'welcome component',
    //     route: '/'
    //   }).save((err) => {
    //     // if (err) { res.send(err); }
    //   });
    //   new Pages({
    //     title: 'about',
    //     contents: 'contents',
    //     route: 'about'
    //   }).save((err) => {
    //     // if (err) { res.send(err); }
    //   });
    //   new Pages({
    //     title: 'work',
    //     contents: 'contents',
    //     route: 'work'
    //   }).save((err) => {
    //     // if (err) { res.send(err); }
    //   });
    //   new Pages({
    //     title: 'contact',
    //     contents: 'contents',
    //     route: 'work'
    //   }).save((err) => {
    //     // if (err) { res.send(err); }
    //   });
    // }
    // res.status(200);
    res.json(pages);
  });

  // res.send('done');
});

router.post('/updateuser', (req, res) => {
  var toUpdate = req.body;
  if (toUpdate.password) {
    toUpdate.password = bcrypt.hashSync(toUpdate.password, saltRounds);
  }
  User.update({_id: toUpdate.id}, toUpdate, (err, data) => {
    if (err) { res.status(500); res.send(err); }
    res.status(200);
    res.send('success');
  });
});

router.post('/deleteuser', (req, res) => {
  User.find({_id: req.body['_id']}).remove(() => {
    res.status(200);
    res.send('done');
  });
});

router.get('/getusers', (req,res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

router.post('/createuser', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err) { res.send(err); return; }
    var newUser = new User({
      username: req.body.username,
      password: hash,
      isAdmin: req.body.isAdmin,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }).save((err) => {
      if (err) { res.send(err); return; }
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
          var response = {
            permissions: permissions,
            firstName: user[0].firstName,
            lastName: user[0].lastName
          };
          res.json(response);
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

router.post('/addcomment', (req,res) => {
  Post.findById({_id: req.body.id}, (err, post) => {
    post.comments.push(req.body.comment);
    console.log(post);
    Post.update({_id: req.body.id}, post, (err, data) => {
      if (err) { res.send(err); }
      res.send('done');
    });
  });
});

module.exports = router;
