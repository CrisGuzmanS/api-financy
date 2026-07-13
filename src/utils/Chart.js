import { Entity } from '@ellescript/collecty';
import { Quotes } from './Quotes.js';

export class Chart extends Entity {

    get quotes() {

        for (const quote of this.object.quotes) {
            quote.high = quote.high ? Number(quote.high.toFixed(2)) : null;
            quote.open = quote.open ? Number(quote.open.toFixed(2)) : null;
            quote.low = quote.low ? Number(quote.low.toFixed(2)) : null;
            quote.close = quote.close ? Number(quote.close.toFixed(2)) : null;
        }

        return new Quotes(this.object.quotes || []);
    }

}