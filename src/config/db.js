const mysql = require("mysql2/promise");

var hostname = "8nbdg.h.filess.io";
var database = "members_measurelaw";
var port = "3307";
var username = "members_measurelaw";
var password = "5d3721c8e798f49e150b9105bdd9d6ba93102cde";

const pool = mysql.createPool({
  host: hostname,
  user: username,
  password,
  database,
  port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    console.log("正在测试数据库连接...");
    const [rows] = await pool.query("SELECT * FROM members");
    console.log("✅ 数据库连接成功", rows);
  } catch (err) {
    console.error("❌ 数据库连接失败:");
    console.error(err);
    process.exit(1);
  }
})();

module.exports = pool;
