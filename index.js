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
  const { limit, skip, title } = req.query; // Store the request on const variable with destructuring method
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${
        process.env.MARVEL_API_KEY //.env marvel api key doesn't push to gitHub (cf Gitignore)
      }&title=${title ? title : ``}&limit=${limit ? limit : ``}&skip=${
        skip && skip //Ternary avoid to send undefined variable to /comics route, send empty string instead
      }`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
});

// Route: /comics/:characterId

app.get(`/comics/:charactersId`);

// Route: /characters

app.get(`/characters`, async (req, res) => {
  const { limit, skip, name } = req.query;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
        process.env.MARVEL_API_KEY
      }&name=${name ? name : ``}&limit=${limit ? limit : ``}&skip=${
        skip ? skip : `` //Ternary avoid to send undefined variable to /comics route, send empty string instead
      }`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
});

// prise en compte des autres routes
app.all(`*`, (req, res) => {
  res.status(404).json({ message: `Page not found` });
});

app.listen(process.env.PORT, () => {
  console.log(`Marvel's server running`);
});
