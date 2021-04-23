const router = require("express").Router();
const axios = require('axios');

/* GET home page */
router.get("/", (req, res, next) => {
  // call the star wars api
  axios.get('https://swapi.py4e.com/api/people')
    .then(response => {
      console.log(response.data.results);
      const characters = response.data.results;
      res.render("index", { characters: characters });
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
