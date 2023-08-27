import { Scene, SceneId, UiId } from "@/engine/scene";
import { Area } from "@/game/area";
import { Player } from "@/game/player";
import { BarrierTile, TallGrassTile, WalkableTile, WaveTile } from "@/game/tiles";
import { GLOBALS, game } from "@/main";
import { KittyCenterBuilding } from "../buildings/kittycenter-building";

export class WorldScene implements Scene {

    // scene interface variables
    name: SceneId = "world";
    uiId: UiId = "game";

    // scene specific variables
    areas: Area[] = [];
    player: Player | null = null;

    spawnOverride: { x: number, y: number } | null = null;

    async buildScene() {
        this.player = new Player(
            GLOBALS.stateManager.state.worldPosition.x,
            GLOBALS.stateManager.state.worldPosition.y
        );
        const area = new Area("start_town", 0, 0);
        this.areas.push(area);

        for (let x = 3; x < 16; x++) {
            for (let y = 0; y < 3; y++) {
                await new WaveTile({
                    x: x * 32,
                    y: y * 32,
                    animationSpeed: 0.02,
                    area
                }).spawn()
            }
        }

        for (let x = 3; x < 16; x++) {
            for (let y = 13; y < 16; y++) {
                await new WaveTile({
                    x: x * 32,
                    y: y * 32,
                    animationSpeed: 0.02,
                    area
                }).spawn()
            }
        }

        for (let x = 13; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                await new WaveTile({
                    x: x * 32,
                    y: y * 32,
                    animationSpeed: 0.02,
                    area
                }).spawn()
            }
        }

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 16; y++) {
                await new WaveTile({
                    x: x * 32,
                    y: y * 32,
                    animationSpeed: 0.02,
                    area
                }).spawn()
            }
        }

        for (let x = 3; x < 13; x++) {
            for (let y = 3; y < 13; y++) {
                await new WalkableTile({
                    x: x * 32,
                    y: y * 32,
                    area,
                    spriteName: "grass"
                }).spawn();
            }
        }

        for (let x = 4; x < 7; x++) {
            for (let y = 4; y < 7; y++) {
                await new TallGrassTile({
                    x: x * 32,
                    y: y * 32,
                    area
                }).spawn();
            }
        }


        for (let x = 3; x < 13; x++) {
            await new BarrierTile({
                x: x * 32,
                y: 3 * 32,
                spriteName: "tree",
                area
            }).spawn();

            await new BarrierTile({
                x: x * 32,
                y: 12 * 32,
                spriteName: "tree",
                area
            }).spawn();
        }

        for (let y = 0; y < 8; y++) {
            if (y === 3 || y === 4) continue;
            await new BarrierTile({
                x: 3 * 32,
                y: (y + 4) * 32,
                spriteName: "tree",
                area
            }).spawn();

            await new BarrierTile({
                x: 12 * 32,
                y: (y + 4) * 32,
                spriteName: "tree",
                area
            }).spawn();
        }

        const c = new KittyCenterBuilding(area);
        await c.spawn();
        c.container.x = 7.75 * 32;
        c.container.y = 5 * 32;
        area.container.addChild(c.container);

        this.player.setArea(area);
        this.player.setControlsEnabled(true);
    }

    async unloadScene() {
        this.player?.destroy();
        game.stage.removeChildren();
    }
}