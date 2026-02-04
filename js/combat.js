export class AttackMotion {
    constructor(name, damage, cooldown, range) {
        this.name = name;
        this.damage = damage;
        this.cooldown = cooldown;
        this.range = range;
        this.timer = 0;
    }

    canAttack() {
        return this.timer <= 0;
    }

    reset() {
        this.timer = this.cooldown;
    }

    update(dt) {
        if (this.timer > 0) {
            this.timer -= dt;
        }
    }
}

export class Unit {
    constructor(x, y, name, color) {
        this.x = x;
        this.y = y;
        this.tileX = 0;
        this.tileY = 0;
        this.name = name;
        this.color = color; // Pastel color for drawing
        this.hp = 100;
        this.maxHp = 100;
        this.attackMotion = new AttackMotion("Basic Attack", 10, 2.0, 1);
        this.target = null;
    }

    update(dt) {
        this.attackMotion.update(dt);
        // AI Logic would go here
    }

    draw(ctx, tileSize) {
        // Simple placeholder drawing
        const cx = this.x * tileSize + tileSize / 2;
        const cy = this.y * tileSize + tileSize / 2;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(cx, cy, tileSize * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // HP Bar
        const hpPct = this.hp / this.maxHp;
        ctx.fillStyle = '#333';
        ctx.fillRect(cx - 15, cy - 20, 30, 4);
        ctx.fillStyle = '#f00';
        ctx.fillRect(cx - 15, cy - 20, 30 * hpPct, 4);
    }
}
