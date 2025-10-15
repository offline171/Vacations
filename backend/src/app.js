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