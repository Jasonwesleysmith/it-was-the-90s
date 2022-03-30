const router = require("express").Router();
const sequelize = require("../config/connection");
const { Movie, Critic, Review, Vote } = require("../models");

router.get("/", (req, res) => {
  console.log("======================");
  Movie.findAll({
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

      res.render("homepage", {
        movies,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single Movie
router.get("/movie/:id", (req, res) => {
  Movie.findOne({
    where: {
      id: req.params.id,
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
          attributes: ["username"],
        },
      },
      {
        model: Critic,
        attributes: ["username"],
      },
    ],
  })
    .then((dbMovieData) => {
      if (!dbMovieData) {
        res.status(404).json({ message: "No movie found with this id" });
        return;
      }

      const movie = dbMovieData.get({ plain: true });

      res.render("single-movie", {
        movie,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
