import { Entity } from "collecty";
import { stock } from "../../../../frontend/src/stocks/stock";

export class Holding extends Entity {

    get profit() {
        const theStock = stock(this.ticker)
        return (theStock.price-this.price.average)/100
    }

}