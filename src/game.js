const Dice = require('./dice');

class Game {
    constructor(playerA, playerB) {
        this.playerA = playerA;
        this.playerB = playerB;
        this.dice = new Dice(6);
        this.gameLog = [];
    }

    simulateTurn(attacker, defender) {
        const attackRoll = this.dice.roll();
        const defendRoll = this.dice.roll();

        const attackDamage = attacker.attack * attackRoll;
        const defendStrength = defender.strength * defendRoll;
        const finalDamage = Math.max(0, attackDamage - defendStrength);

        defender.takeDamage(finalDamage);

        this.gameLog.push({
            attacker: attacker.name,
            defender: defender.name,
            attackRoll,
            defendRoll,
            damage: finalDamage,
            remainingHealth: defender.health
        });

        return finalDamage;
    }

    play() {
        this.gameLog = [];
        let currentAttacker = this.playerA.health <= this.playerB.health ? this.playerA : this.playerB;
        let currentDefender = currentAttacker === this.playerA ? this.playerB : this.playerA;

        while (this.playerA.isAlive() && this.playerB.isAlive()) {
            this.simulateTurn(currentAttacker, currentDefender);
            [currentAttacker, currentDefender] = [currentDefender, currentAttacker];
        }

        return {
            winner: this.playerA.isAlive() ? this.playerA : this.playerB,
            log: this.gameLog
        };
    }
}

// Example usage
// ... rest of the Game class code ...

// Example usage
if (require.main === module) {
    const Player = require('./player');
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const players = [];

    function getPlayerInfo(playerNumber) {
        return new Promise((resolve) => {
            console.log(`\nEnter Player ${playerNumber} details:`);
            rl.question('Name: ', (name) => {
                rl.question('Health: ', (health) => {
                    rl.question('Strength: ', (strength) => {
                        rl.question('Attack: ', (attack) => {
                            const player = new Player(
                                name || `Player ${playerNumber}`,
                                parseInt(health) || 100,
                                parseInt(strength) || 10,
                                parseInt(attack) || 5
                            );
                            resolve(player);
                        });
                    });
                });
            });
        });
    }

    async function startGame() {
        try {
            console.log('Welcome to Magical Arena!\n');
            
            const playerA = await getPlayerInfo('A');
            const playerB = await getPlayerInfo('B');

            console.log('\nStarting battle...');
            
            const game = new Game(playerA, playerB);
            const result = game.play();

            console.log("\nBattle Log:");
            result.log.forEach((turn, index) => {
                console.log(`\nTurn ${index + 1}:`);
                console.log(`${turn.attacker} attacks ${turn.defender}`);
                console.log(`Attack Roll: ${turn.attackRoll}`);
                console.log(`Defend Roll: ${turn.defendRoll}`);
                console.log(`Damage Dealt: ${turn.damage}`);
                console.log(`${turn.defender}'s remaining health: ${turn.remainingHealth}`);
            });

            console.log(`\nWinner: ${result.winner.name}!`);
            rl.close();
        } catch (error) {
            console.error('An error occurred:', error);
            rl.close();
        }
    }

    startGame();
}

module.exports = Game;