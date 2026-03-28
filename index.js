import { Stock } from './src/Stock/Stock.js';
import express from 'express';
import cors from 'cors';

const app = express()

app.use(cors());

const PORT = 3000

app.get('/', async (req, res) => {
  const stock = await Stock.ticker('GOOGL');
  res.send(stock);
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})