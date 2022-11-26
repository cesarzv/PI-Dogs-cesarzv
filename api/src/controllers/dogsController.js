const axios = require('axios');
const { Breed, Temperament } = require('../db');

const dataDb = async () => {
  const dataBreed = await Breed.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });

  return dataBreed;
};

const dataApi = async () => {
  const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
  const breedsInfo = await breeds.data;

  let result = breedsInfo.map((b) => {
    return {
      id: b.id,
      name: b.name,
      height: b.height,
      weight: b.weight,
      life_span: b.life_span,
      image: b.image.url,
      temperament: b.temperament,
    };
  });
  return result;
};

const allData = async () => {
  const api = await dataApi();
  let db = await dataDb();

  db = await db.map((d) => {
    return {
      id: d.id,
      name: d.name,
      height: d.height,
      weight: d.weight,
      life_span: d.life_span,
      image: d.image,
      temperament: d.Temperaments.map((t) => {
        return t.name;
      }).join(', '),
      createdInDb: d.createdInDb,
    };
  });
  console.log(db);
  return api.concat(db);
};

module.exports = {
  allData,
};
