const Order = require('../models/Order');

exports.create = async (req, res) => {
  try {
    const { items, totalAmount, customerEmail } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
      customerEmail: customerEmail || req.user.email
    });

    res.status(201).json(order);

    // Notification Temps Réel via Socket.IO
    const io = req.app.get('io');
    if (io) {
      io.emit('new_order', { orderId: order._id, amount: order.totalAmount });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Commande non trouvée' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
