const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("cookie-session");
const methodOverride = require('method-override');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const bookmarksRouter = require("./api/bookmarks");
const ratingsRouter = require("./api/ratings");
const usersRouter = require("./api/users");
const vacationSpotRouter = require("./api/vacationSpotRouter");
const pool = require("./services/db");

const app = express();
app.set("views", path.join(__dirname, "../frontend/views"));
app.set("view engine", "ejs");

app.use(sessoin({secret: "dogs", resave: false, saveUninitialized: false}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use("/bookmarks", bookmarksRouter);
app.use("/ratings", ratingsRouter);
app.use("/users", usersRouter);
app.use("/vacations", vacationSpotRouter);

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];  
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
        return done(err);
    }
  })
);

