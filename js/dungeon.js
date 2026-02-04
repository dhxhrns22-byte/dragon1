export class Room {
    constructor(type = 'empty') {
        this.type = type; // empty, trap, monster, resource, core
        this.units = [];
        this.level = 1;
    }
}

export class DungeonMap {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];
        this.tileSize = 64; // Visual size in pixels
        
        this.initialize();
    }

    initialize() {
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                row.push(new Room());
            }
            this.grid.push(row);
        }
        
        // Set entrance and core
        this.grid[Math.floor(this.height/2)][0].type = 'entrance';
        this.grid[Math.floor(this.height/2)][this.width-1].type = 'core';
    }

    getRoom(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.grid[y][x];
        }
        return null;
    }

    buildRoom(x, y, type) {
        const room = this.getRoom(x, y);
        if (room && room.type !== 'core' && room.type !== 'entrance') {
            room.type = type;
            return true;
        }
        return false;
    }
}
