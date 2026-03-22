import YahooFinance from "yahoo-finance2/src/index.ts";
import { Format } from "../helpers/Format.js";
import fs from 'fs';
import { Unformat } from "../helpers/Unformat.js";

const yf = new YahooFinance({
    suppressNotices: ['yahooSurvey']
});

export class Stock {

    constructor(data) {
        this.data = data;
    }

    static async ticker(ticker) {
        return new Stock(await yf.quoteSummary(ticker));
    }

    marketCapitalization() {

        if (isNaN(this.data.price.marketCap)) {
            return 'N/A';
        }

        return Format.millions(this.data.price.marketCap)
    }

    regularMarketPrice() {
        return Format.money(this.data.price.regularMarketPrice);
    }

    drawdown() {
        let percentage = (this.data.summaryDetail.allTimeHigh - this.data.price.regularMarketPrice) / this.data.summaryDetail.allTimeHigh * 100;
        percentage = percentage.toFixed(2);
        return `${percentage}%`;
    }

    status() {
        const file = JSON.parse(fs.readFileSync('config/stock.json', 'utf8'));

        const marketDrawdown = Unformat.percentage(this.drawdown())

        if (file.MSFT.correction.micro.from < marketDrawdown && marketDrawdown < file.MSFT.correction.micro.to) {
            return `MICRO ${Format.percentage(marketDrawdown)} (${Format.percentage(file.MSFT.correction.micro.from)} a ${Format.percentage(file.MSFT.correction.micro.to)})`;
        }

        if (file.MSFT.correction.mini.from < marketDrawdown && marketDrawdown < file.MSFT.correction.mini.to) {
            return `MINI ${Format.percentage(marketDrawdown)} (${Format.percentage(file.MSFT.correction.mini.from)} a ${Format.percentage(file.MSFT.correction.mini.to)})`;
        }

        if (file.MSFT.correction.normal.from < marketDrawdown && marketDrawdown < file.MSFT.correction.normal.to) {
            return `NORMAL ${Format.percentage(marketDrawdown)} (${Format.percentage(file.MSFT.correction.normal.from)} a ${Format.percentage(file.MSFT.correction.normal.to)})`;
        }

        if (file.MSFT.correction.super.from < marketDrawdown && marketDrawdown < file.MSFT.correction.super.to) {
            return `SUPER ${Format.percentage(marketDrawdown)} (${Format.percentage(file.MSFT.correction.super.from)} a ${Format.percentage(file.MSFT.correction.super.to)}) `;
        }

        if (file.MSFT.correction.mega.from < marketDrawdown && marketDrawdown < file.MSFT.correction.mega.to) {
            return `MEGA ${Format.percentage(marketDrawdown)} (${Format.percentage(file.MSFT.correction.mega.from)} a ${Format.percentage(file.MSFT.correction.mega.to)})`;
        }

        let correction = 'N/A';

        return correction

    }
}