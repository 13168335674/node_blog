var createError = require("http-errors");
var express = require("express");
var path = require("path");
var fs = require("fs");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const loginCheck = require("./middleware/loginCheck");

const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

var app = express();

const ENV = process.env.NODE_ENV;
if (ENV !== "production") {
  app.use(
    logger("dev", {
      stream: process.stdout,
    }),
  );
} else {
  const logFileName = path.resolve(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFileName, {
    flags: "a",
  });
  app.use(
    logger("combined", {
      stream: writeStream,
    }),
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

const redisChilent = require("./db/redis");
const sessionStore = new RedisStore({
  client: redisChilent,
});
app.use(
  session({
    secret: "adi_secret",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: sessionStore,
  }),
);
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
