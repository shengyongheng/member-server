const pool = require("../config/db");

exports.getAllMembers = async (req, res) => {
  console.log("收到获取所有成员的请求");
  try {
    console.log("正在查询数据库...");
    const [rows] = await pool.query("SELECT * FROM members");
    console.log("查询结果:", rows);
    res.json(rows);
  } catch (err) {
    console.error("查询出错:", err);
    res.status(500).json({ error: "服务器错误" });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM members WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "成员未找到" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "服务器错误" });
  }
};

exports.createMember = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: "缺少必要字段" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO members (id, name) VALUES (?, ?)",
      [id, name]
    );
    res.status(201).json({ id, name });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(409).json({ error: "ID已存在" });
    } else {
      console.error(err);
      res.status(500).json({ error: "创建失败" });
    }
  }
};

exports.updateMember = async (req, res) => {
  const { name, id } = req.body;
  if (!name || !id) {
    return res.status(400).json({ error: "需要提供名称和id" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE members SET name = ? ,id = ? WHERE id = ?",
      [name, id, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "成员未找到" });
    }
    res.json({ id: req.params.id, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "更新失败" });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM members WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "成员未找到" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "删除失败" });
  }
};
