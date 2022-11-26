const axios = require('axios');
const { Temperament } = require('../db');

const dataTemps = async () => {
  const temperament = await axios.get('https://api.thedogapi.com/v1/breeds');
  const temperamentInfo = temperament.data.map((t) => t.temperament);

  const temps = temperamentInfo.join().split(',').sort();

  await temps
    .filter((t, i) => temps.indexOf(t) === i)
    .forEach((t) => {
      Temperament.findOrCreate({
        where: {
          name: t.trim(),
        },
      });
    });

  const getTemps = await Temperament.findAll({ order: [['name']] });
  return getTemps;
};

module.exports = {
  dataTemps,
};
