class Player {
    constructor(name, health, strength, attack) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.attack = attack;
        this.initialHealth = health;
    }

    isAlive() {
        return this.health > 0;
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
    }

    reset() {
        this.health = this.initialHealth;
    }
}

module.exports = Player;