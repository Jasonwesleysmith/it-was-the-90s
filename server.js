const express = require("express");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));

// connect to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at port ${PORT}`));
});
