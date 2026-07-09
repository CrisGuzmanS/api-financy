import { Vix } from './Vix.js';

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
    return Vix.create();
}