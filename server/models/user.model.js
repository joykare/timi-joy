// get an instance of mongoose and mongoose.Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// set up a mongoose model and pass it using module.exports
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    }
  },
  email: {
    type: String,
    validate: {
      validator: (email) => {
        return /\w+@\w+\.\w+/.test(email);
      },
      message: "{VALUE} is not a valid email address!"
    },
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

// hash password before user is saved
userSchema.pre("save", function (next) {
  const user = this;
  // hash only if the password has been changed OR user is new
  if (!user.isModified("password"))
    return next();
  //generate the hash
  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err)
      return next(err);
    user.password = hash;
    next();
  });
});

// method to compare a give password with the db hash
userSchema.methods.comparePassword = function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("User", userSchema);