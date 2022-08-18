require(`dotenv`).config();
const express = require(`express`);
const axios = require(`axios`);
const router = express.Router();

// Route: /characters
router.get(`/characters`, async (req, res) => {
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
router.get(`/character/:characterId`, async (req, res) => {
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

module.exports = router;
