import YahooFinance from 'yahoo-finance2';
import { Entity } from '@ellescript/collecty';

export class Vix extends Entity {

    static async create() {
        const yf = new YahooFinance({
            suppressNotices: ['yahooSurvey']
        });
        const vix = await yf.quote('^VIX');

        const period2 = new Date();
        const period1 = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const chart = await yf.chart("^VIX", {
            period1,
            period2,
            interval: "1m",
        });

        const candle300 = findCandle(chart, 15, 0);
        const candle315 = findCandle(chart, 10, 30);

        return new Vix({
            current: chart.quotes.at(-1).close,
            previous: chart.quotes.at(-11).close
        })
    }
}

function findCandle(chart, hour, minute) {
    return chart.quotes.find(q => {
        const date = new Date(q.date);

        const parts = new Intl.DateTimeFormat("es-MX", {
            timeZone: "Etc/GMT+5", // GMT-5
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).formatToParts(date);

        const h = Number(parts.find(p => p.type === "hour").value);
        const m = Number(parts.find(p => p.type === "minute").value);

        return h === hour && m === minute;
    });
}