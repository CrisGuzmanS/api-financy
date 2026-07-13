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
export const vix = async (...args) => {

    if(args.length === 0) {
        return Vix.get(-1);
    }

    if(args.length === 1) {
        return Vix.get(args[0]);
    }

    throw new Error('Invalid arguments');
}