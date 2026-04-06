import express, { json } from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(json());

let stats = { total: 0, confirmed: 0, lastTime: "-" };
let logs = [];
let activeAlert = null;
let lastSeen = null;

app.get("/api/ping", (req, res) => {
  lastSeen = Date.now();
  res.sendStatus(200);
});

app.post("/api/alert", (req, res) => {
  const { location } = req.body;
  lastSeen = Date.now();

  const now = new Date();
  const timeStr = now.toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const fullDate = now.toLocaleString("ro-RO");

  stats.total++;
  stats.lastTime = timeStr;
  activeAlert = { location: location || "Unknown", time: timeStr };
  logs.unshift({ location: location || "Brasov, Romania", date: fullDate });

  res.status(200).send("OK");
});

app.get("/api/data", (req, res) => {
  const isOnline = lastSeen ? Date.now() - lastSeen < 12000 : false;

  res.json({
    stats,
    logs,
    activeAlert,
    isOnline,
  });
});

app.post("/api/confirm", (req, res) => {
  stats.confirmed++;
  activeAlert = null;
  res.sendStatus(200);
});

app.listen(1234, () => console.log("Server started on port 1234"));
