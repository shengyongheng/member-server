const express = require("express");
const bodyParser = require("body-parser");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
const memberRoutes = require("./routes/memberRoutes");
app.use("/api/members", memberRoutes);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "服务器内部错误" });
});

// 本地开发服务器
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3008;
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
  });
}

// Netlify Functions 导出
module.exports.handler = serverlessHttp(app);
