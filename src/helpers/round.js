export const round = (number) => {
    if (isNaN(number)) throw new Error('Invalid number');
    return Math.floor(number * 2) / 2;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    console.log(round(process.argv[2]));
}