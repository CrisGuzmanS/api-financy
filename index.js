import { Stock } from './src/Stock/Stock.js';
import express from 'express';
import cors from 'cors';
import { vix } from './src/Vix/vix.js';
import YahooFinance from "yahoo-finance2";
import { Format } from './src/helpers/Format.js';
import { Holding } from './src/holdings/models/Holding.js';

const app = express()

app.use(cors());
app.use(express.json());

const PORT = process.env.APP_PORT || 3000
const HOST = process.env.APP_HOST || '127.0.0.1'

app.get('/', async (req, res) => {
  const stock = await Stock.ticker('GOOGL');
  res.send(stock);
})

app.get('/vix', async (req, res) => {
  res.send(await vix());
})

app.get('/stocks/:ticker', async (req, res) => {
  const stock = await Stock.ticker(req.params.ticker);
  res.send(stock.toJSON());
})

app.get('/dolar', async (req, res) => {
  const yf = new YahooFinance({
    suppressNotices: ['yahooSurvey']
  });
  const data = await yf.quote('MXN=X');
  const pesos = Format.money(data.regularMarketPrice);
  res.send(pesos);
})

app.get('/holdings', async (req, res) => {

  const holdings = await Holding.all()
  res.json({
    body: holdings.toArray()
  })
})

app.post('/holdings', async (req, res) => {

  console.log(req.body)

  const newHolding = await Holding.create(req.body)

  res.json({
    body: newHolding
  })

})

app.delete('/holdings/:id', async (req, res) => {
  await Holding.delete(req.params.id)
  res.json({
    message: 'Holding deleted'
  })
})

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})