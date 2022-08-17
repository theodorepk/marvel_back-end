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

//Route .get who request the /comics route from Reacteur Marvel API
app.get(`/comics`, async (req, res) => {
  // Store the request on const variable with destructuring method
  const { limit, skip, title } = req.query;
  console.log(`limit is ${limit}, skip is ${skip} and title is ${title}`);
  try {
    const response = await axios.get(
      //.env marvel api key doesn't push to gitHub (cf Gitignore)
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${
        process.env.MARVEL_API_KEY
        //Here ternary avoid to send undefined variable to /comics route, send empty string instead
      }&title=${title ? title : ``}&limit=${limit ? limit : ``}&skip=${
        skip ? skip : ``
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
