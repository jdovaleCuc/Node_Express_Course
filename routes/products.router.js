const express = require('express');

const ProductsService = require('../services/product.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { GetProductShema, UpdateProductSchema, CreateProductSchema } = require('../schemas/product.schema')

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const data = await service.find();
  res.status(200).json(data);
});

router.get('/:id', validatorHandler(GetProductShema, 'params'), (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.status(200).json(product);
});

router.post('/', validatorHandler(CreateProductSchema, 'body'), (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(GetProductShema, 'params'),
  validatorHandler(UpdateProductSchema, 'body'),
  (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = service.update(id, body);
    res.status(200).json(product);
  }
);

router.delete('/:id',validatorHandler(GetProductShema, 'params'), (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.status(200).json(rta);
});

module.exports = router;
