import YahooFinance from 'yahoo-finance2';

/**
 * Get the current value of the VIX
 * 
 * @example
 * const value = await vix();
 * console.log(value); // e.g. 16.99
 * 
 * @returns {Promise<number>}
 */
export const vix = async () => {
    const yf = new YahooFinance({
        suppressNotices: ['yahooSurvey']
    });
    const vix = await yf.quote('^VIX');
    return vix.regularMarketPrice
}