// 引入 express 框架
const express = require("express");
// 创建网站服务器
const app = express();

app.get("/", (req, res) => {
  // send()
  // 1. send 方法内部会检测响应内容的类型
  // 2. send 方法会自动设置 http 状态码
  // 3. send 方法还会帮我们自动设置响应的内容类型以及编码
  res.send("Hello Express");
});

app.get("/list", (req, res) => {
  // 向客户端直接响应一个对象
  res.send({ name: "zhangsan", age: 20 });
});

// 监听端口
app.listen(3000);
console.log("网站服务器启动成功");
