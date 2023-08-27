import { game } from "@/main";
import * as PIXI from "pixi.js";
import { Tile } from "./tiles";

export type AreaIds = "start_town" | "kitty_center";

export class Area {
    container = new PIXI.Container();
    tiles: Tile[] = [];

    constructor(public areaId: AreaIds, public x: number, public y: number) {
        this.container.x = x;
        this.container.y = y;
        game.stage.addChild(this.container);
    }

    addTile(tile: Tile) {
        this.tiles.push(tile);
    }
}