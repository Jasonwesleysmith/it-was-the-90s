const router = require("express").Router();
const { Critic, Movie, Review, Vote } = require("../../models");

// get all users (critics)
router.get("/", (req, res) => {
  Critic.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbCriticData) => res.json(dbCriticData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one user (critic)
router.get("/:id", (req, res) => {
  Critic.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Movie,
        attributes: ["id", "title", "movie_url", "created_at"],
      },
      {
        model: Review,
        attributes: ["id", "review_text", "created_at"],
        include: {
          model: Movie,
          attributes: ["title"],
        },
      },
      {
        model: Movie,
        attributes: ["title"],
        through: Vote,
        as: "voted_movies",
      },
    ],
  })
    .then((dbCriticData) => {
      if (!dbCriticData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbCriticData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Critic.create({
    critic: req.body.critic,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbCriticData) => {
      req.session.save(() => {
        req.session.critic_id = dbCriticData.id;
        req.session.critic = dbCriticData.critic;
        req.session.loggedIn = true;

        res.json(dbCriticData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  Critic.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbCriticData) => {
    if (!dbCriticData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbCriticData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.critic_id = dbCriticData.id;
      req.session.critic = dbCriticData.critic;
      req.session.loggedIn = true;

      res.json({ user: dbCriticData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(400).end();
  }
});

router.put("/id:", (req, res) => {
  Critic.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbCriticData) => {
      if (!dbCriticData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbCriticData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Critic.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCriticData) => {
      if (!dbCriticData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbCriticData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
