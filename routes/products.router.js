const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const data = service.find();
  res.status(200).json(data);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id); 
  res.status(200).json(product);
 
});

router.post('/', (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(404).json({
      message: 'body undefined',
      statusCode: 404,
    });
  }
  res.status(201).json({
    message: 'Created',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if(id === "999"){
    res.status(304).json({
      message: "Error, Not Modified ",
    })
  }else{
    res.json({
      message: 'updated',
      data: body,
      id
    });
  }
  
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id
  });
});

module.exports = router;
