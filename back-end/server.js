const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "brands.json");

app.use(cors());
app.use(express.json());

// 📌 Получить список брендов
app.get("/api/brands", (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Ошибка чтения файла" });
  }
});

// 📌 Обновить список брендов
app.post("/api/brands/update", (req, res) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка записи файла" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend запущен: http://localhost:${PORT}`);
});
