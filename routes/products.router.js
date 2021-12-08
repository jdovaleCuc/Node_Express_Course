const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'producto_1',
    price: 50000,
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(404).json({
      message: 'body undefined',
      statusCode: 404,
    });
  }
  res.json({
    message: 'Created',
    data: body,
  });
});

module.exports = router;
