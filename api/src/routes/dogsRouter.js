const express = require('express');
const { allData } = require('../controllers/dogsController.js');
const { Breed, Temperament } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const { name } = req.query;

  const dogs = await allData();

  try {
    if (name) {
      let result = await dogs.filter((r) =>
        r.name.toLowerCase().includes(name.toLowerCase())
      );
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.status(400).json('El perro no fue encontrado');
      }
    } else {
      let result = await dogs.map((b) => {
        return {
          id: b.id,
          name: b.name,
          height: b.height,
          weight: b.weight,
          life_span: b.life_span,
          image: b.image,
          temperament: b.temperament,
        };
      });
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const dogs = await allData();

  try {
    if (id) {
      let result = await dogs.filter((r) => r.id == id);
      if (result.length) {
        let dogFind = result.map((r) => {
          return {
            id: r.id,
            name: r.name,
            height: r.height,
            weight: r.weight,
            life_span: r.life_span,
            image: r.image,
            temperament: r.temperament,
          };
        });
        console.log(result);
        res.status(200).json(dogFind);
      } else {
        res.status(400).json('No se encontro un perro con esta ID');
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, height, weight, life_span, image, temperament, createdInDb } =
      req.body;
    const newBreed = await Breed.create({
      name,
      height,
      weight,
      life_span,
      image,
      createdInDb,
    });

    let temperamentDb = await Temperament.findAll({
      where: { name: temperament },
    });

    await newBreed.addTemperament(temperamentDb);
    res.status(200).send(newBreed);
  } catch (error) {
    // res.status(400).send('No se pudo crear el dog');
    res.status(400).send(error.message);
  }
});

module.exports = router;
