let NUM_DOTS = 12;
let FADE_FACTOR = .8;

let dots = [];
let mouse = {
    x: 0,
    y: 0
};

var Dot = function () {
    this.x = 0;
    this.y = 0;
    this.node = (function () {
        let n = document.createElement(`div`);
        n.className = `trail`;
        document.body.appendChild(n);
        return n;
    }());
};

Dot.prototype.draw = function () {
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
};


function initDrawing() {

    for (const i of Array(NUM_DOTS).keys()) {
        let d = new Dot();
        dots.push(d);
    }


    addEventListener(`mousemove`, function (event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    });


}
function draw() {
    let lastX = dots.pe
    // console.log(`Drawing...`);
    let x = mouse.x;
    let y = mouse.y;
    // console.log(`x: ${x}, y: ${y}...`);
    dots.forEach(function (dot, index, dots) {
        let nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw();
        x += (nextDot.x - dot.x) * FADE_FACTOR;
        y += (nextDot.y - dot.y) * FADE_FACTOR;
    });
}

function animate() {
    // console.log(`Animating...`);
    draw();
    requestAnimationFrame(animate);
}

function main() {
    // initDrawing();
    // animate();

}

main();