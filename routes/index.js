const express = require('express');
const router = express.Router();
const request = require('request');

// const testing = [];

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
})

router.get('/', (req, res) => {
  request.get(nowPlayingUrl, (err, response, movieData) => {
    if (err) throw(err.stack);
    const parseData = JSON.parse(movieData);
    // testing.push(parseData.results);
    res.render('index', {
      movieData: parseData.results,
    })
  });
});

// movie/{id} wildcard
router.get('/movie/:movieid', (req, res) => {
  const id = req.params.movieid;
  const thisMovieURL = `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
  request.get(thisMovieURL, (error, response, movieData) => {
    if (error) throw error;
    const parseData = JSON.parse(movieData);
    res.render('single-movie', {
      parseData
    });
  });
  // const data = testing[0];
  // var title, overview, url;
  // data.forEach(e => {
  //   if (id == e.id) {
  //     title = e.title;
  //     overview = e.overview;
  //     url = e.poster_path;
  //     return;
  //   }
  // });
  // res.render('single-movie', {
  //   title,
  //   overview,
  //   imageBaseUrl,
  //   url
  // });
});

router.post('/search', (req, res, next) => {
  const movieSearch = req.body.movieSearch;
  const category = req.body.cat;
  const url = `${apiBaseUrl}/search/${category}?api_key=1fb720b97cc13e580c2c35e1138f90f8&language=en-US&query=${movieSearch}&page=1&include_adult=false`;

  request.get(url, (error, response, data) => {
    const parseData = JSON.parse(data);
    res.render('index', {
      movieData: parseData.results
    });
  });

});

module.exports = router;
