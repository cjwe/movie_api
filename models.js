const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

// Mongoose schemas
/**
 * Mongoose schema for movie objects.
 * {
 * Title: { type: String, required: true },
 * Description: { type: String, required: true },
 * Genre: {
 *   Name: String,
 *   Description: String,
 * },
 * Director: {
 *   Name: String,
 *   Bio: String,
 * },
 * Actors: [String],
 * ImagePath: String,
 * Featured: Boolean,
 *}
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

/**
 * Mongoose schema for user objects.
 *{
 * Username: { type: String, required: true },
 * Password: { type: String, required: true },
 * Email: { type: String, required: true },
 * Birthday: Date,
 * FavMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
 * }
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

/**
 * Hash password with bcrypt.
 * @param {string} - password string
 * @returns {string} - password hash
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Validate an entered password by comparing it to the stored password hash.
 * @param {string} - password string
 * @returns {boolean}
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

// Create models
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

// Export models
module.exports.Movie = Movie;
module.exports.User = User;
