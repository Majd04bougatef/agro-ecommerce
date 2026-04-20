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
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/cart', require('./src/routes/cartRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/payments', require('./src/routes/paymentRoutes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

server.listen(process.env.PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${process.env.PORT}`);
});
