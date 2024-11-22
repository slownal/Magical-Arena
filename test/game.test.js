const { Game, getPlayerInfo } = require('../src/game');
const Player = require('../src/player');
const readline = require('readline');

jest.mock('readline', () => ({
    createInterface: jest.fn().mockReturnValue({
        question: jest.fn(),
        close: jest.fn()
    })
}));

describe('Game', () => {
    let playerA;
    let playerB;
    let game;
    let rl;

    beforeEach(() => {
        playerA = new Player('Player A', 50, 5, 10);
        playerB = new Player('Player B', 100, 10, 5);
        game = new Game(playerA, playerB);
        rl = readline.createInterface();
        readline.createInterface.mockClear();
    });

    test('should initialize game with two players', () => {
        expect(game.playerA).toBe(playerA);
        expect(game.playerB).toBe(playerB);
    });

    test('should have player with lower health attack first', () => {
        const result = game.play();
        expect(result.log[0].attacker).toBe('Player A');
    });

    test('should create player with default values when input is empty', async () => {
        const mockInputs = ['', '', '', ''];
        let inputIndex = 0;

        rl.question.mockImplementation((question, callback) => {
            callback(mockInputs[inputIndex++]);
        });

        const player = await getPlayerInfo('A');
        expect(player.name).toBe('Player A');
        expect(player.health).toBe(100);
        expect(player.strength).toBe(10);
        expect(player.attack).toBe(5);
    });
});