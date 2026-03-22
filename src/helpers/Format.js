import { percentage } from "./percentage.js";

export class Format {

    static millions(number) {
        number = number / 1_000_000;
        return '$' + number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    static percentage(number) {
        return percentage(number);
    }

    static money(number) {
        return '$' + number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}