var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const clientP = require("./config/connection");

var userRouter = require("./routes/user");
var adminRouter = require("./routes/admin");

var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());
const cors = require("cors");
app.use(cors());

var store = new MongoDBStore({
  clientPromise: clientP, // Use your MongoDB connection string
  collection: "mySessions",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});
app.use(
  session({
    secret: process.env.SECRET,
    store: store,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

app.use("/", userRouter);
app.use("/admin", adminRouter);
app.listen(3000);
module.exports = app;
