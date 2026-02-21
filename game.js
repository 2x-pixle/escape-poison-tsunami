'use strict';

class Game {
    constructor() {
        this.player = { position: { x: 0, y: 0 }, speed: 1, upgrades: 0 };
        this.poisonTsunami = { active: false, timer: 20 };
        this.brainrot = [];
        this.spawnInterval = 3000; // 3 seconds
        this.shop = [];
        this.spinWheel = [];
        this.base = { position: { x: 10, y: 10 }, status: 'active' };
        this.brainrotTimer = null;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startGameLoop();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        // Additional event listeners for shop and spin wheel can be added
    }

    handleKeyDown(e) {
        switch (e.key) {
            case 'ArrowUp':
                this.movePlayer(0, -this.player.speed);
                break;
            case 'ArrowDown':
                this.movePlayer(0, this.player.speed);
                break;
            case 'ArrowLeft':
                this.movePlayer(-this.player.speed, 0);
                break;
            case 'ArrowRight':
                this.movePlayer(this.player.speed, 0);
                break;
        }
    }

    movePlayer(dx, dy) {
        this.player.position.x += dx;
        this.player.position.y += dy;
        console.log(`Player moved to (${this.player.position.x}, ${this.player.position.y})`);
    }

    activatePoisonTsunami() {
        this.poisonTsunami.active = true;

        setTimeout(() => {
            this.poisonTsunami.active = false;
            console.log('Poison tsunami has ended');
        }, this.poisonTsunami.timer * 1000);
    }

    spawnBrainrot() {
        const brainrot = { position: this.generateRandomPosition(), timer: 30 };
        this.brainrot.push(brainrot);
        console.log(`Brainrot spawned at ${brainrot.position.x}, ${brainrot.position.y}`);

        this.brainrotTimer = setTimeout(() => {
            this.removeBrainrot(brainrot);
        }, brainrot.timer * 1000);
    }

    removeBrainrot(brainrot) {
        this.brainrot = this.brainrot.filter(b => b !== brainrot);
        console.log('Brainrot disappeared');
    }

    generateRandomPosition() {
        return { x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) }; // Example bounds
    }

    upgradeSpeed() {
        this.player.speed++;
        this.player.upgrades++;
        console.log(`Player speed upgraded to ${this.player.speed}`);
    }

    openShop() {
        console.log('Shop opened');
        // Implement shop logic
    }

    spinWheel() {
        console.log('Spin the wheel for rewards');
        // Implement spin wheel logic
    }

    startGameLoop() {
        setInterval(() => {
            // Game loop logic, update state, check collisions, etc.
            this.spawnBrainrot();
        }, this.spawnInterval);
    }
}

const game = new Game();
