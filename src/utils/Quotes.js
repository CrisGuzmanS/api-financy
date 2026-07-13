import { Collection } from "@ellescript/collecty";
import { Quote } from "./Quote.js";

export class Quotes extends Collection {

    at(...args) {

        if (args.length === 1 && typeof args[0] === "number") {
            return new Quote(this.toArray().at(args[0]));
        }

        if (args.length === 2 && typeof args[0] === "string" && typeof args[1] === "string") {
            const formatter = new Intl.DateTimeFormat("es-MX", {
                timeZone: args[1],
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });

            return new Quote(this.toArray().find(q => formatter.format(q.date) === args[0]));
        }
    }

    find(predicate) {
        return this.toArray().find(predicate);
    }

}