import YahooFinance from '../../../src/utils/YahooFinance.js';

export class Market {

    static async isOpen() {
        const yf = new YahooFinance();
        const sp500 = await yf.quote('^GSPC');
        return sp500.marketState === 'REGULAR';
    }
}