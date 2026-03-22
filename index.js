import { Stock } from './src/Stock/Stock.js';

// SP500
const stock = await Stock.ticker('GOOGL');

console.log(stock.status());