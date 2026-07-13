import OriginalYahooFinance from 'yahoo-finance2';
import { Chart } from './Chart.js';

export default class YahooFinance extends OriginalYahooFinance {

    constructor() {
        super({
            suppressNotices: ['yahooSurvey']
        });
    }

    async chart(symbol, options = {}) {

        const period2 = new Date();
        const period1 = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const theChart = await super.chart(symbol, {
            period1,
            period2,
            interval: "1m",
            ...options
        });

        return new Chart(theChart);
    }
}