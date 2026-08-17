// const express = require("express");
// const bodyParser = require("body-parser");
// const serverlessHttp = require("serverless-http");
// const cors = require("cors");
// const app = express();
// require("./cron/refreshTokenCron.js")

// // 中间件
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // 路由
// const pingCodeRoutes = require("./routes/pingCodeRoutes");
// const memberRoutes = require("./routes/memberRoutes");
// app.use("/api/pingcode", pingCodeRoutes);
// app.use("/api/members", memberRoutes);

// // 错误处理
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "服务器内部错误" });
// });

// // 本地开发服务器
// if (process.env.NODE_ENV !== "production") {
//   const PORT = process.env.PORT || 3008;
//   app.listen(PORT, () => {
//     console.log(`服务器运行在端口 ${PORT}`);
//   });
// }

// // Netlify Functions 导出
// module.exports.handler = serverlessHttp(app);


import express from 'express';
import bodyParser from 'body-parser';
import serverlessHttp from 'serverless-http';
import cors from 'cors';
import './cron/refreshTokenCron.js'; // 仅执行副作用（定时任务）

// 路由导入（必须带 .js 扩展名，因为 ESM 要求）
import pingCodeRoutes from './routes/pingCodeRoutes.js';
import memberRoutes from './routes/memberRoutes.js';

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由挂载
app.use('/api/pingcode', pingCodeRoutes);
app.use('/api/members', memberRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

// 本地开发服务器
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3008;
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
  });
}

// Netlify Functions 导出（适配 serverless-http）
export const handler = serverlessHttp(app);