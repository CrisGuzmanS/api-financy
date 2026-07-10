import YahooFinance from '../src/../../../src/utils/YahooFinance.js';
import { Entity } from '@ellescript/collecty';

export class Vix extends Entity {

    static async create() {
        const yf = new YahooFinance({
            suppressNotices: ['yahooSurvey']
        });
        const vix = await yf.quote('^VIX');

        const period2 = new Date();
        const period1 = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const chart = await yf.chart("^VIX");

        const current = chart.quotes.at(-1)
        const previous = chart.quotes.at(-11)

        return new Vix({
            current: current.close,
            current: previous.close
        })
    }
}