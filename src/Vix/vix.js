import YahooFinance from 'yahoo-finance2';

export const vix = async () => {
    const yf = new YahooFinance({
        suppressNotices: ['yahooSurvey']
    });
    const vix = await yf.quote('^VIX');
    return vix.regularMarketPrice
}
