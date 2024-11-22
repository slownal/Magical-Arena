const Dice = require('../src/dice');

describe('Dice', () => {
    let dice;

    beforeEach(() => {
        dice = new Dice(6);
    });

    test('should create dice with specified number of sides', () => {
        expect(dice.sides).toBe(6);
    });

    test('should roll number between 1 and number of sides', () => {
        for (let i = 0; i < 100; i++) {
            const result = dice.roll();
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(6);
        }
    });
});