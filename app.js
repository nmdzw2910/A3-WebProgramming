const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const vendors = require('vendors');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer')
const path = require('path');
// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS

app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + './node_modules_bootstrap/dist/css' ));
app.use(express.static(__dirname+ './config'));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//Body Parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/users', require('./routes/users.js'));
app.use('/', require('./routes/index.js'));
const PORT = process.env.PORT || 5000;



const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only! (jpeg, jpg, png, gif)');
  }
}

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('welcome'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('welcome', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('welcome', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('welcome', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});



app.listen(PORT, console.log(`Server started on port ${PORT}`));
