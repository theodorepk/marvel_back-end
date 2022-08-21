require(`dotenv`).config();
const express = require(`express`);
const axios = require(`axios`);
const router = express.Router();

// Route: /comics
// It request the Reacteur Marvel API with query parameters. Only limit, skip and title parameters will be send to the /comic route from Marvel API
router.get(`/comics`, async (req, res) => {
  const { limit = 100, skip = 0, title = `` } = req.query; // Store the request on const variable with destructuring method (if variable doesn't exist asign it default values)
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
router.get(`/comics/:characterId`, async (req, res) => {
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

module.exports = router;
