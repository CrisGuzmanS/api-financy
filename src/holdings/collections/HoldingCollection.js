import { Collection } from "collecty";
import { Holding } from "../entities/Holding";

export class HoldingCollection extends Collection {
    item(element) {
        return new Holding(element);
    }
}