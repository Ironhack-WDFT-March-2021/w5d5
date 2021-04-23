const router = require("express").Router();
const { uploader, cloudinary } = require("../config/cloudinary");
const Movie = require('../models/Movie');

/* GET home page */
router.get("/", (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('index', { movies });
    })
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add');
});

router.post('/movie/add', uploader.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.path;
  const imgName = req.file.originalname;
  const publicId = req.file.filename;
  console.log(req.file);
  Movie.create({ title, description, imgPath: imgPath, imgName, publicId })
    .then(movie => {
      console.log(movie);
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    })
});

router.get('/movie/delete/:id', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(movieThatWasDeleted => {
      // check if this deleted movie had an image
      if (movieThatWasDeleted.imgPath) {
        // delete that image on cloudinary
        cloudinary.uploader.destroy(movieThatWasDeleted.publicId);
      }
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    })
});


module.exports = router;
