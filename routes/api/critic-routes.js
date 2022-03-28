const router = require('express').Router();
const { Critic, Movie, Review, Vote } = require('../../models');

// get all users (critics)
router.get('/:id', (req, res) => {
    Critic.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Movie,
                attributes: ['id', 'title', 'movie_url', 'created_at']
            },
            {
                model: Review,
                attributes: ['id', 'review_text', 'created_at'],
                include: {
                    model: Movie,
                    attributes: ['title']
                }
            },
            {
                model: Movie,
                attributes: ['title'],
                through: Vote,
                as: 'voted_movies'
            }
        ]
    })
     .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});