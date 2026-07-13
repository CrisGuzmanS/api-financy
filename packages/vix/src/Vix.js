import YahooFinance from '../src/../../../src/utils/YahooFinance.js';
import { Entity } from '@ellescript/collecty';
import { Quote } from '../../../src/utils/Quote.js';

export class Vix extends Entity {

    static async get(...args) {
        const yf = new YahooFinance({
            suppressNotices: ['yahooSurvey']
        });

        if (args.length === 0) {
            const vix = await yf.quote('^VIX');
            return vix.close;
        }

        if(args.length === 1) {
            
            const period2 = new Date();
            const period1 = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
            const chart = await yf.chart("^VIX");
    
            const vix = chart.quotes.at(args[0]);
            return vix.close;
        }
    }
}