const Critic = require('./Critic');
const Movie = require('./Movie');
const Review = require('./Review');
const Vote = require('./Vote');

Critic.hasMany(Movie, {
    foreignKey: 'critic_id'
  });

Movie.belongsTo(Critic, {
    foreignKey: 'critic_id',
  });

  Critic.belongsToMany(Movie, {
    through: Vote,
    as: 'voted_movies',
    foreignKey: 'critic_id'
  });
  
  Movie.belongsToMany(Critic, {
    through: Vote,
    as: 'voted_movies',
    foreignKey: 'movie_id'
  });

  Vote.belongsTo(Critic, {
    foreignKey: 'critic_id'
  });
  
  Vote.belongsTo(Movie, {
    foreignKey: 'movie_id'
  });
  
  Critic.hasMany(Vote, {
    foreignKey: 'critic_id'
  });
  
  Movie.hasMany(Vote, {
    foreignKey: 'movie_id'
  });

  Review.belongsTo(Critic, {
    foreignKey: 'critic_id'
  });
  
  Review.belongsTo(Movie, {
    foreignKey: 'movie_id'
  });
  
  Critic.hasMany(Review, {
    foreignKey: 'critic_id'
  });
  
  Movie.hasMany(Review, {
    foreignKey: 'movie_id'
  });

module.exports = { Critic, Movie, Vote, Review}