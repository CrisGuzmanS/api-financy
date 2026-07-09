import { Stock } from './src/Stock/Stock.js';
import express from 'express';
import cors from 'cors';
import { vix } from 'vix';
import YahooFinance from "yahoo-finance2";
import { Format } from './src/helpers/Format.js';
import { Holding } from './src/holdings/models/Holding.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express()

app.use(cors());
app.use(express.json());

const PORT = process.env.APP_PORT || 3000
const HOST = process.env.APP_HOST || '127.0.0.1'

app.get('/', async (req, res) => {
  const stock = await Stock.ticker('GOOGL');
  res.send(stock);
})

app.get("/vix", async (req, res) => {

  try{

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const vixValue = await vix();

    const info = await transporter.sendMail({
      from: `"Mi App" <${process.env.EMAIL_USER}>`,
      to: "cristian.guzman.contacto@gmail.com",
      subject: "Prueba",
      html: `<h1>${vixValue.current}</h1>`,
    });

    res.send(vixValue.current);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/stocks/:ticker', async (req, res) => {
  const stock = await Stock.ticker(req.params.ticker);
  res.send({
    body: stock
  });
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