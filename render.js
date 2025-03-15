import { getEntitiesWith } from '../ecs.js';
export function createRenderComponent(fill = "white", width = 8, height = 8) {
    return { fill, height, width }
}

const dungeon = [

	"########################################",
	"#......................................#",
	"#...............................x......#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"#......................................#",
	"########################################",
]
const TILE_WIDTH = 8;
const WIDTH = 40
const HEIGHT = 20

const COLOR = {
	black: { r: 0, g: 0, b: 0 },
	white: { r: 255, g: 255, b: 255 },
	dark: { r: 51, g: 51, b: 51 },
	mid: { r: 119, g: 119, b: 119 },
	light: { r: 187, g: 187, b: 187 },
}
const game = window.game
game.width = TILE_WIDTH * WIDTH
game.height = TILE_WIDTH * HEIGHT
game.style.imageRendering =  "pixelated"; 
// game.style.imageRendering =  "crisp-edges"; // Later we might use it to detect browsers that are not ok with "pixelated"
document.body.style.margin = "unset"
const ctx = game.getContext("2d");

function Block(r, g, b, a) {
	const imgData = ctx.createImageData(8, 8);
	for (let i = 0; i < imgData.data.length; i += 4) {
		imgData.data[i + 0] = r;
		imgData.data[i + 1] = g;
		imgData.data[i + 2] = b;
		imgData.data[i + 3] = a;
	}
	return imgData;

}
function Block_RGB(color) {
	return Block(color.r, color.g, color.b, 255);
}

const block_white = Block_RGB(COLOR.white)
const block_black = Block_RGB(COLOR.black)
const block_mid = Block_RGB(COLOR.mid)
const block_light = Block_RGB(COLOR.light)

const char2Block = {
	'#': block_mid,
	'.': block_black,
	'x': block_white
}

const dungeon_height = dungeon.length;

function paint_dungeon() {
    for (let i = 0; i < dungeon_height; i++) {
        const row = dungeon[i]
        const row_length = row.length
        for (let j = 0; j < row_length; j++) {
            const current_char = row.charAt(j)
            if (char2Block.hasOwnProperty(current_char)) {
                ctx.putImageData(char2Block[current_char], j * 8, i * 8)
            } else {
                ctx.putImageData(block_light, j * 8, i * 8)
            }
    
        }
    }
}


/**
 * 
 * Above is not used right now
 * 
 */


function Backdrop() {
	const imgData = ctx.createImageData(40*8, 20*8);
	for (let i = 0; i < imgData.data.length; i += 4) {
		imgData.data[i + 0] = 0x33;
		imgData.data[i + 1] = 0x33;
		imgData.data[i + 2] = 0x33;
		imgData.data[i + 3] = 0xFF;
	}
	return imgData;

}
const backdrop = Backdrop()
ctx.putImageData(backdrop, 0,0)


export const Renderer = {
    update(dt) {
   
        const entities = getEntitiesWith( 'render');
        ctx.putImageData(backdrop, 0,0)
        entities.forEach(entity => {
        
            const render = entity.components.render;
            const position = entity.components.position;
       
            
            ctx.fillStyle = render.fill
            ctx.fillRect(position.x, position.y, render.width, render.height)

        })
    }
}
