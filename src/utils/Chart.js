import { Entity } from '@ellescript/collecty';
import { Quotes } from './Quotes.js';

export class Chart extends Entity {

    get quotes() {
        return new Quotes(this.object.quotes || []);
    }

}