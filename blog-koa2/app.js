const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const fs = require("fs");
const path = require("path");
const morgan = require("koa-morgan");

const blog = require("./routes/blog");
const user = require("./routes/user");

const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const { REDIS_CONF } = require("./conf/db");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  }),
);
app.use(json());
// app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  }),
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const ENV = app.env;
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./logs", "access.log"),
  {
    flags: "a",
  },
);

// setup the logger
if (ENV === "dev" || ENV === "test") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: accessLogStream,
    }),
  );
}

app.keys = ["adi_keys"];
app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  }),
);

// routes
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
