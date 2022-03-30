const router = require("express").Router();
const sequelize = require("../config/connection");
const { Movie, Critic, Review, Vote } = require("../models");
const withAuth = require("../utils/auth");

// get all posts for dashboard
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("======================");
  Movie.findAll({
    where: {
      critic_id: req.session.critic_id,
    },
    attributes: [
      "id",
      "movie_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE movie.id = vote.movie_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Review,
        attributes: [
          "id",
          "review_text",
          "movie_id",
          "critic_id",
          "created_at",
        ],
        include: {
          model: Critic,
          attributes: ["critic"],
        },
      },
      {
        model: Critic,
        attributes: ["critic"],
      },
    ],
  })
    .then((dbMovieData) => {
      const movies = dbMovieData.map((movie) => movie.get({ plain: true }));
      res.render("dashboard", { movies, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Movie.findByPk(req.params.id, {
    attributes: [
      "id",
      "movie_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE movie.id = vote.movie_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Review,
        attributes: [
          "id",
          "review_text",
          "movie_id",
          "critic_id",
          "created_at",
        ],
        include: {
          model: Critic,
          attributes: ["critic"],
        },
      },
      {
        model: Critic,
        attributes: ["critic"],
      },
    ],
  })
    .then((dbMovieData) => {
      if (dbMovieData) {
        const movie = dbMovieData.get({ plain: true });

        res.render("edit-movie", {
          movie,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
