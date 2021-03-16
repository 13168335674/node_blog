const router = require("koa-router")();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/user");

router.post("/login", async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const result = await login(username, password);
  if (result.username) {
    ctx.session.username = username;
    ctx.body = new SuccessModel({
      errno: 0,
      username,
      password,
    });
  } else {
    res.json(new ErrorModel("登录失败"));
  }
});

router.get("/login-test", async function (ctx, next) {
  console.log("/login-test");
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;
  ctx.body = {
    viewCount: ctx.session.viewCount,
  };
});

module.exports = router;
