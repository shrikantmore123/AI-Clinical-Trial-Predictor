require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { isLoggedIn } = require("./middleware");

const User = require("./models/user");
const Trial = require("./models/Trial");

// Routes
const userRouter = require("./routes/users");
const trialRouter = require("./routes/trials");

// --- MongoDB connection ---
const MONGO_URL = "mongodb://127.0.0.1:27017/clinical_trial";

mongoose.connect(MONGO_URL)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.log("❌ DB Connection Error:", err));

// --- App settings ---
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// --- Session ---
const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// --- Passport ---
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- Flash & current user middleware ---
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// --- Routes ---
app.get("/", (req, res) => {
  res.render("templates/index");
});

app.use("/trials", trialRouter);

// Form route
app.get("/form", isLoggedIn, (req, res) => {
    res.render("templates/form");
});

// Dashboard route
app.get('/dashboard', isLoggedIn, async (req, res) => {
    try {
        const trials = await Trial.find({ author: req.user._id })
                                  .sort({ createdAt: -1 })
                                  .limit(5); 
        res.render('templates/dashboard', { trials });  
    } catch (err) {
        console.error('Error loading dashboard:', err);
        res.render('templates/dashboard', { trials: [] });
    }
});

app.use("/", userRouter);
app.use("/submit-trial", trialRouter);

// --- 404 handler ---
app.all("*", (req, res, next) => {
    res.status(404).render("error", { err: { message: "Page Not Found", statusCode: 404 } });
});

// --- Error handler ---
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error", { err: { message, statusCode } });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
