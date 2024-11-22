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
    });

    test('should take damage correctly', () => {
        player.takeDamage(30);
        expect(player.health).toBe(70);
    });

    test('should not have negative health', () => {
        player.takeDamage(150);
        expect(player.health).toBe(0);
    });
});