const express = require("express");
const path = require("node:path");
const { Pool } = require("pg");
const session = require("cookie-session");
const methodOverride = require('method-override');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const bookmarksRouter = require("./backend/src/api/bookmarks");
const ratingsRouter = require("./backend/src/api/ratings");
const usersRouter = require("./backend/src/api/users");
const vacationSpotRouter = require("./backend/src/api/vacations");
const pool = require("./backend/src/services/db");
const port = 3002;

const app = express();
app.set("views", path.join(__dirname, "./frontend/views"));
app.set("view engine", "ejs");

app.use(session({secret: "dogs", resave: false, saveUninitialized: false}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use("/bookmarks", bookmarksRouter);
app.use("/ratings", ratingsRouter);
app.use("/users", usersRouter);
app.use("/", vacationSpotRouter);

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
