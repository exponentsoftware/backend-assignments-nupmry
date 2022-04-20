const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../app/models/User")

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())