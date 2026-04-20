const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['légumes', 'fruits', 'céréales', 'produits_laitiers', 'viandes'],
    required: true
  },
  price: { type: Number, required: true },
  unit: { type: String, enum: ['kg', 'unité', 'litre', 'pièce'], required: true },
  stock: { type: Number, required: true, default: 0 },
  imageUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
