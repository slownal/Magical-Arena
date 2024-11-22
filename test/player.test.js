const Player = require('../src/player');

describe('Player', () => {
    let player;

    beforeEach(() => {
        player = new Player('Test Player', 100, 10, 5);
    });

    test('should initialize player with correct attributes', () => {
        expect(player.name).toBe('Test Player');
        expect(player.health).toBe(100);
        expect(player.strength).toBe(10);
        expect(player.attack).toBe(5);
        expect(player.initialHealth).toBe(100);
    });

    test('should be alive when health is above 0', () => {
        expect(player.isAlive()).toBeTruthy();
    });

    test('should be dead when health is 0', () => {
        player.takeDamage(100);
        expect(player.isAlive()).toBeFalsy();
    });

    test('should take damage correctly', () => {
        player.takeDamage(30);
        expect(player.health).toBe(70);
    });

    test('should not have negative health when taking excessive damage', () => {
        player.takeDamage(150);
        expect(player.health).toBe(0);
    });

    test('should reset health to initial value', () => {
        player.takeDamage(50);
        expect(player.health).toBe(50);
        player.reset();
        expect(player.health).toBe(100);
    });
});