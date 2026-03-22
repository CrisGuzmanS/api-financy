export class Unformat {
    static percentage(number) {
        number = number.replace('%', '');
        number = parseFloat(number);
        return number / 100;
    }
}