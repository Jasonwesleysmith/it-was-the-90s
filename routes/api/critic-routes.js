const router = require('express').Router();
const { Critic, Movie, Review, Vote } = require('../../models');

// get all users (critics)
router.get('/', (req, res) => {
    Critic.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// get one user (critic)
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

router.post('/', (req, res) => {
    Critic.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('login', (req, res) => {
    Critic.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
      
        res.json({ user: dbUserData, message: 'You are now logged in!' });
    });

});