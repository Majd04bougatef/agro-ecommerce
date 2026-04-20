const router = require('express').Router();
const auth = require('../middleware/auth');

const carts = {};

router.get('/', auth, (req, res) => {
  res.json(carts[req.user.id] || []);
});

router.post('/', auth, (req, res) => {
  const { items } = req.body;
  carts[req.user.id] = items;
  res.json({ message: 'Panier mis à jour', items });
});

router.delete('/', auth, (req, res) => {
  delete carts[req.user.id];
  res.json({ message: 'Panier vidé' });
});

module.exports = router;
