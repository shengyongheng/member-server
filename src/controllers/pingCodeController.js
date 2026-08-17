// const pool = require("../config/db");

// exports.getToken = async (req, res) => {
//   try {
//     console.log("正在查询数据库...");
//     const [rows] = await pool.query("SELECT * FROM pingcode_token");
//     console.log("查询结果:", rows);
//     res.json(rows);
//   } catch (err) {
//     console.error("查询出错:", err);
//     res.status(500).json({ error: "服务器错误" });
//   }
// };

import pool from '../config/db.js';

export const getToken = async (req, res) => {
  try {
    console.log('正在查询数据库...');
    const [rows] = await pool.query('SELECT * FROM pingcode_token');
    console.log('查询结果:', rows);
    res.json(rows);
  } catch (err) {
    console.error('查询出错:', err);
    res.status(500).json({ error: '服务器错误' });
  }
};