export class InputHandler {
    constructor(canvas, game) {
        this.game = game;
        this.canvas = canvas;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseDown = false;

        // Event Listeners
        canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
        
        // Disable context menu
        canvas.addEventListener('contextmenu', e => e.preventDefault());
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    onMouseMove(e) {
        const pos = this.getMousePos(e);
        this.mouseX = pos.x;
        this.mouseY = pos.y;
        this.game.onMouseMove(this.mouseX, this.mouseY);
    }

    onMouseDown(e) {
        this.isMouseDown = true;
        const pos = this.getMousePos(e);
        this.game.onClick(pos.x, pos.y);
    }

    onMouseUp(e) {
        this.isMouseDown = false;
    }
}
