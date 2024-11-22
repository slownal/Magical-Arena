const Game = require('../src/game');
const Player = require('../src/player');

describe('Game', () => {
    let playerA;
    let playerB;
    let game;

    beforeEach(() => {
        playerA = new Player('Player A', 50, 5, 10);
        playerB = new Player('Player B', 100, 10, 5);
        game = new Game(playerA, playerB);
    });

    test('should initialize game with two players', () => {
        expect(game.playerA).toBe(playerA);
        expect(game.playerB).toBe(playerB);
    });

    test('should have player with lower health attack first', () => {
        const result = game.play();
        expect(result.log[0].attacker).toBe('Player A');
    });

    test('should end game when a player dies', () => {
        const result = game.play();
        expect(playerA.isAlive() || playerB.isAlive()).toBeTruthy();
        expect(result.winner).toBeDefined();
    });

    test('should maintain game log of all turns', () => {
        const result = game.play();
        expect(Array.isArray(result.log)).toBeTruthy();
        expect(result.log.length).toBeGreaterThan(0);
        
        const firstTurn = result.log[0];
        expect(firstTurn).toHaveProperty('attacker');
        expect(firstTurn).toHaveProperty('defender');
        expect(firstTurn).toHaveProperty('attackRoll');
        expect(firstTurn).toHaveProperty('defendRoll');
        expect(firstTurn).toHaveProperty('damage');
        expect(firstTurn).toHaveProperty('remainingHealth');
    });

    test('should simulate turn correctly', () => {
        const damage = game.simulateTurn(playerA, playerB);
        expect(typeof damage).toBe('number');
        expect(damage).toBeGreaterThanOrEqual(0);
    });

    test('should declare correct winner', () => {
        // Force one player to die
        playerB.takeDamage(100);
        const result = game.play();
        expect(result.winner).toBe(playerA);
    });
});