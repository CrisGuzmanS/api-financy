import YahooFinance from "yahoo-finance2/src/index.ts";

export const drawdown = async (ticker) => {

    const yf = new YahooFinance({
        suppressNotices: ['yahooSurvey']
    });
    const stock = await yf.quoteSummary(ticker);

    let percentage = (stock.summaryDetail.allTimeHigh - stock.price.regularMarketPrice) / stock.summaryDetail.allTimeHigh * 100;
    percentage = percentage.toFixed(2);
    return `${percentage}%`;

}