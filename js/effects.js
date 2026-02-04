import { Utils } from './utils.js';

export class VisualEffect {
    constructor(x, y, lifeTime) {
        this.x = x;
        this.y = y;
        this.lifeTime = lifeTime;
        this.age = 0;
        this.isDead = false;
    }

    update(dt) {
        this.age += dt;
        if (this.age >= this.lifeTime) {
            this.isDead = true;
        }
    }

    draw(ctx) {
        // Override
    }
}

export class Particle extends VisualEffect {
    constructor(x, y, color, speed, size) {
        super(x, y, Utils.random(0.5, 1.5));
        this.color = color;
        this.vx = Utils.random(-speed, speed);
        this.vy = Utils.random(-speed, speed);
        this.size = size;
        this.alpha = 1;
    }

    update(dt) {
        super.update(dt);
        this.x += this.vx;
        this.y += this.vy;
        this.alpha = 1 - (this.age / this.lifeTime);
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

export class ClickSplashEffect extends VisualEffect {
    constructor(x, y) {
        super(x, y, 0.5);
        this.particles = [];
        for(let i=0; i<8; i++) {
            this.particles.push(new Particle(x, y, Utils.randomPastelColor(), 2, Utils.random(2, 5)));
        }
    }

    update(dt) {
        super.update(dt);
        this.particles.forEach(p => p.update(dt));
    }

    draw(ctx) {
        this.particles.forEach(p => p.draw(ctx));
    }
}

export class EffectManager {
    constructor() {
        this.effects = [];
    }

    addEffect(effect) {
        this.effects.push(effect);
    }

    update(dt) {
        this.effects = this.effects.filter(e => !e.isDead);
        this.effects.forEach(e => e.update(dt));
    }

    draw(ctx) {
        this.effects.forEach(e => e.draw(ctx));
    }
}
