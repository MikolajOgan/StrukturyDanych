const list = new List();

const stats = {
    write: 0,
    read: 0
};

const console_input = document.getElementById("console_input");
const loop_count_input = document.getElementById("loop_count");
const stats_output = document.getElementById("stats_output");
const start = document.getElementById("start");

class Size {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Color {
    constructor(r, g, b, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

class Display {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.size = new Size(500, 500);
        this.canvas.width = this.size.x;
        this.canvas.height = this.size.y;
        this.canvas.classList.add("display");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
    }
}

Display.prototype.draw = function (position, color = new Color(0, 0, 0), size = new Size(1, 1)) {
    this.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    this.ctx.fillRect(position.x, this.size.y - position.y, size.x, size.y);
}

start.addEventListener("click", () => {
    const display = new Display();
    let loop_count = loop_count_input.value;
    for (let i = 0; i < loop_count; ++i) {
        stats.read = 0;
        stats.write = 0;
        eval(console_input.value);
        stats_output.innerHTML = `Wykonanych zapisów: ${stats.write}, wykonanych odczytów: ${stats.read}, łącznie operacji: ${stats.write + stats.read}.`;
        display.draw(new Position(i, stats.read), new Color(0, 0, 250));
        display.draw(new Position(i, stats.write), new Color(0, 250, 0));
    }
});