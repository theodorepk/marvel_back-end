require(`dotenv`).config();
const express = require("express");
const app = express();
const cors = require(`cors`);
const comicsRoutes = require(`./routes/comics`);
const charactersRoutes = require(`./routes/characters`);
app.use(cors(), comicsRoutes, charactersRoutes);

//Just some test MUST CHANGE
app.get(`/`, (req, res) => {
  res.json({ message: "Hi" });
});

// prise en compte des autres routes
app.all(`*`, (req, res) => {
  res.status(404).json({ message: `Page not found` });
});

app.listen(process.env.PORT, () => {
  console.log(`Marvel's server running`);
});
