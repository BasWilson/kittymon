import { Scene, SceneId, UiId } from "@/engine/scene";
import { Area } from "@/game/area";
import { Player } from "@/game/player";
import { BarrierTile, GrassTile, TallGrassTile, WaveTile } from "@/game/tiles";
import { game } from "@/main";

export class WorldScene implements Scene {

    // scene interface variables
    name: SceneId = "world";
    uiId: UiId = "game";

    // scene specific variables
    areas: Area[] = [];

    async buildScene() {
        const player = new Player();
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
                await new GrassTile({
                    x: x * 32,
                    y: y * 32,
                    area
                }).spawn();

                if (Math.random() < 0.1) {
                    await new TallGrassTile({
                        x: x * 32,
                        y: y * 32,
                        area
                    }).spawn();
                }
            }
        }

        for (let x = 3; x < 13; x++) {
            await new BarrierTile({
                x: x * 32,
                y: 3 * 32,
                area
            }).spawn();

            await new BarrierTile({
                x: x * 32,
                y: 12 * 32,
                area
            }).spawn();
        }

        for (let y = 0; y < 8; y++) {
            await new BarrierTile({
                x: 3 * 32,
                y: (y + 4) * 32,
                area
            }).spawn();

            await new BarrierTile({
                x: 12 * 32,
                y: (y + 4) * 32,
                area
            }).spawn();
        }

        player.setArea(area);
        player.setControlsEnabled(true);
    }

    async unloadScene() {
        game.stage.removeChildren();
    }
}