import { DungeonMap } from './dungeon.js';
import { EffectManager, ClickSplashEffect } from './effects.js';
import { Utils } from './utils.js';

export class Game {
    constructor(canvas, uiRef) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false; // Pixel art look

        this.dungeon = new DungeonMap(10, 8); // 10x8 grid
        this.effects = new EffectManager();
        this.ui = uiRef;

        this.lastTime = 0;
        this.selectedBuildType = null; // Current tool

        this.offsetX = 50; // Map padding
        this.offsetY = 50;

        // Resize handling
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        // Fit to container (parent)
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
        
        // Center the map
        const mapW = this.dungeon.width * this.dungeon.tileSize;
        const mapH = this.dungeon.height * this.dungeon.tileSize;
        this.offsetX = (this.canvas.width - mapW) / 2;
        this.offsetY = (this.canvas.height - mapH) / 2;
        
        this.ctx.imageSmoothingEnabled = false;
    }

    start() {
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t));
        this.appendMessage("던전 엔진이 가동되었습니다! 준비 완료, 주인님!");
    }

    loop(timestamp) {
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(dt);
        this.draw();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        this.effects.update(dt);
        // Unit updates would go here
    }

    draw() {
        // Clear background
        this.ctx.fillStyle = '#1a1b26';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawMap();
        this.effects.draw(this.ctx);
    }

    drawMap() {
        const ts = this.dungeon.tileSize;
        
        for (let y = 0; y < this.dungeon.height; y++) {
            for (let x = 0; x < this.dungeon.width; x++) {
                const room = this.dungeon.grid[y][x];
                const drawX = this.offsetX + x * ts;
                const drawY = this.offsetY + y * ts;

                // Base Room Style
                let color = '#2e3047'; // Empty
                if (room.type === 'entrance') color = '#a8d5e2';
                else if (room.type === 'core') color = '#f3d250';
                else if (room.type === 'trap') color = '#f8b195';
                else if (room.type === 'monster') color = '#c06c84';
                else if (room.type === 'resource') color = '#99b898';

                this.ctx.fillStyle = color;
                
                // Glow effect for special rooms
                if (room.type !== 'empty') {
                    this.ctx.shadowBlur = 10;
                    this.ctx.shadowColor = color;
                } else {
                    this.ctx.shadowBlur = 0;
                }

                this.ctx.fillRect(drawX + 2, drawY + 2, ts - 4, ts - 4);
                this.ctx.shadowBlur = 0; // Reset

                // Border (Glass look)
                this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(drawX + 2, drawY + 2, ts - 4, ts - 4);
            }
        }
    }

    setBuildType(type) {
        this.selectedBuildType = type;
        this.appendMessage(`${type} 건설 모드로 전환했습니다.`);
    }

    onClick(x, y) {
        // Convert screen hex to grid coords
        const mapX = x - this.offsetX;
        const mapY = y - this.offsetY;
        const ts = this.dungeon.tileSize;

        const tileX = Math.floor(mapX / ts);
        const tileY = Math.floor(mapY / ts);

        // Click effect
        this.effects.addEffect(new ClickSplashEffect(x, y));

        if (tileX >= 0 && tileX < this.dungeon.width && tileY >= 0 && tileY < this.dungeon.height) {
            if (this.selectedBuildType) {
                const success = this.dungeon.buildRoom(tileX, tileY, this.selectedBuildType);
                if (success) {
                    this.appendMessage(`${tileX}, ${tileY} 위치에 ${this.selectedBuildType} 건설 완료!`);
                } else {
                    this.appendMessage("거기는 건설할 수 없어요! (입구거나 코어입니다)");
                }
            } else {
                this.appendMessage(`${tileX}, ${tileY} 방을 선택했습니다.`);
            }
        }
    }

    onMouseMove(x, y) {
        // Could enable highlight here
    }

    appendMessage(msg) {
        if (this.ui.log) {
            this.ui.log.innerText = `[System]: ${msg}`;
            // Trigger animation restart
            this.ui.log.style.animation = 'none';
            this.ui.log.offsetHeight; /* trigger reflow */
            this.ui.log.style.animation = 'fadeUp 1s ease-out forwards';
        }
    }
}
