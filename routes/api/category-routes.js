const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
    .then(products => {
      res.json(products)
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  })
    .then(category => {
      res.json(category)
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body, {
    include: [Product]
  })
    .then(createdCategory => {
      res.json(createdCategory)
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(newName => {
      res.json(newName)
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleted => {
    res.json({...deleted, msg: 'Category successfully removed.'})
  })
});

module.exports = router;
