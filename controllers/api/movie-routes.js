const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Movie, Critic, Review, Vote } = require("../../models");
const withAuth = require('../../utils/auth');

// get all users
router.get("/", (req, res) => {
  console.log("==================");
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
    order: [["created_at", "DESC"]],
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
    .then((dbMovieData) => res.json(dbMovieData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
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
      if (!dbMovieData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbMovieData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Movie.create({
    title: req.body.title,
    movie_url: req.body.movie_url,
    critic_id: req.session.critic_id,
  })
    .then((dbMovieData) => res.json(dbMovieData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/upvote", (req, res) => {
  Movie.upvote(req.body, { Vote, Review, Critic })
    .then((updatedVoteData) => res.json(updatedVoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Movie.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbMovieData) => {
      if (!dbMovieData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbMovieData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Movie.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbMovieData) => {
      if (!dbMovieData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbMovieData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
