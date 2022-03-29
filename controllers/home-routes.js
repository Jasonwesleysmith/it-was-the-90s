const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movie, Critic, Review, Vote } = require('../models');

router.get('/', (req, res) => {
    console.log('======================');
    Movie.findAll({
      attributes: [
        'id',
        'movie_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE movie.id = vote.movie_id)'), 'vote_count']
      ],
      include: [
        {
          model: Review,
          attributes: ['id', 'review_text', 'movie_id', 'critic_id', 'created_at'],
          include: {
            model: Critic,
            attributes: ['username']
          }
        },
        {
          model: Critic,
          attributes: ['username']
        }
      ]
    })
      .then(dbMovieData => {
        const movies = dbMovieData.map(movie => movie.get({ plain: true }));
  
        res.render('homepage', {
          movies,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });