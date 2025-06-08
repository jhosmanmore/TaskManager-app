require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas conectado'))
.catch((err) => console.error(err));

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});

