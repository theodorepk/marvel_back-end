require(`dotenv`).config();
const express = require("express");
const app = express();
const axios = require(`axios`);
const { log } = require("console");
const { resourceLimits } = require("worker_threads");

//Just some test MUST CHANGE
app.get(`/`, (req, res) => {
  console.log(req.query);
  res.json({ message: "Hi" });
});

// Route: /comics
// It ask the Reacteur Marvel API with query parameters. Only limit, skip and title parameters will be send to the /comic route from Marvel API
app.get(`/comics`, async (req, res) => {
  const { limit = 50, skip = 0, title = `` } = req.query; // Store the request on const variable with destructuring method (if variable doesn't exist asign it default values)
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${
        process.env.MARVEL_API_KEY //.env marvel api key doesn't push to gitHub (cf Gitignore)
      }&title=${title}&limit=${limit}&skip=${skip}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
});

// Route: /comics/:characterId
app.get(`/comics/:characterId`, async (req, res) => {
  const { characterId } = req.params;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: /characters
app.get(`/characters`, async (req, res) => {
  const { limit = 50, skip = 0, name = `` } = req.query;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&limit=${limit}&skip=${skip}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
});

// Route: /character/:characterId
app.get(`/character/:characterId`, async (req, res) => {
  const { characterId } = req.params;
  console.log(characterId);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// prise en compte des autres routes
app.all(`*`, (req, res) => {
  res.status(404).json({ message: `Page not found` });
});

app.listen(process.env.PORT, () => {
  console.log(`Marvel's server running`);
});
