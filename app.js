const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const dotenv = require("dotenv");

const User = require("./models/user.js");

const { isLoggedIn, saveRedirectUrl } = require("./middleware");

const trialRouter = require("./routes/trials");
const userRouter = require("./routes/users.js"); 

const port = 3000;
dotenv.config();

const MONGO_URL = "mongodb://127.0.0.1:27017/clinical_trial";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ Connected to MongoDB");
}
main().catch(err => console.log("❌ DB Connection Error:", err));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("templates/index");
});

app.use("/", userRouter);
app.use("/", trialRouter);

app.get("/dashboard", isLoggedIn, async (req, res) => {
  const trials = await Trial.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.render("templates/dashboard", { trials });
});

app.get("/form", isLoggedIn, (req, res) => {
  res.render("templates/form");
});

// 404 handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});