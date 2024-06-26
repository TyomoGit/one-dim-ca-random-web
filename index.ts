import init, * as wasm from "./pkg/one_dim_ca_random_web.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const title = document.getElementById("title") as HTMLHeadingElement;

init()
.then(() => {
    main();
})

function main() {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000";
    
    const rule = Math.floor(Math.random() * 255);
    title.textContent += " (Rule: " + rule.toString() + ")";

    const reduction = 3;

    canvas.width = canvas.clientWidth / reduction;
    canvas.height = canvas.clientHeight / reduction;

    const worldManager = new wasm.WorldManager(canvas.width, canvas.height, rule);
    const world = worldManager.make();
    for (let y = 0; y < worldManager.height; y++) {
        for (let x = 0; x < worldManager.width; x++) {
            if (world[y * worldManager.width + x] === 1) {
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}

function newWorldWrapper(): wasm.WorldManager {
    return new wasm.WorldManager(100, 100, 30);
}
