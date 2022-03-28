const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Movie, Critic, Review, Vote } = require('../../models');

// get all users
router.get('/', (req, res) => {
    console.log('==================');
    Movie.findAll({
        attributes: [
            'id',
            'movie_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE movie.id = vote.movie_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
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
        .then(dbMovieData => res.json(dbMovieData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Movie.findOne({
        where: {
            id: req.params.id
        },
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
                attributes: ['id', 'review_text', 'movie_id', 'user_id', 'created_at'],
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
            if (!dbMovieData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
            }
            res.json(dbMovieData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});