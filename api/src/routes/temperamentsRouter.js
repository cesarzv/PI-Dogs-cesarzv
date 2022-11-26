const express = require('express');
const { dataTemps } = require('../controllers/temperamentsController.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const temps = await dataTemps();
    res.status(200).send(temps);
  } catch (error) {
    res.status(404).send('Error');
  }
});

module.exports = router;
