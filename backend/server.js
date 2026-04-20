const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // En prod, l'origine devrait être plus spécifique
    methods: ["GET", "POST"]
  }
});

// Partage de l'instance IO avec les routes/controllers
app.set('io', io);

io.on('connection', (socket) => {
  console.log('🔌 Nouveau client connecté:', socket.id);
  socket.on('disconnect', () => console.log('🔌 Client déconnecté'));
});

app.use(cors());

// Webhook Stripe doit avoir accès au body RAW (avant express.json())
app.use('/api/webhook', express.raw({ type: 'application/json' }));
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());

// Connexion MongoDB via config/db.js
const connectDB = require('./src/config/db');
connectDB();

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/cart', require('./src/routes/cartRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/payments', require('./src/routes/paymentRoutes'));
app.use('/api/webhook', require('./src/routes/webhookRoutes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
