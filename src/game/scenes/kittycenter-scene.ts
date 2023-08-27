import { Scene, SceneId, UiId } from "@/engine/scene";
import { loadSpritesheet } from "@/engine/sprites";
import { Area } from "@/game/area";
import { Player } from "@/game/player";
import { BarrierTile, TriggerTile, WalkableTile } from "@/game/tiles";
import { GLOBALS, game } from "@/main";

export class KittyCenterScene implements Scene {

    // scene interface variables
    name: SceneId = "kitty_center";
    uiId: UiId = "game";

    // scene specific variables
    areas: Area[] = [];
    player: Player | null = null;

    async buildScene() {
        this.player = new Player(7.5 * 32, 11 * 32);
        const area = new Area("kitty_center", 0, 0);
        this.areas.push(area);

        for (let x = 3; x < 13; x++) {
            for (let y = 3; y < 13; y++) {
                await new WalkableTile({
                    x: x * 32,
                    y: y * 32,
                    area,
                    spriteName: "woodenfloor"
                }).spawn();
            }
        }

        for (let x = 3; x < 13; x++) {
            await new BarrierTile({
                x: x * 32,
                y: 2 * 32,
                spriteName: "invisible",
                area,
            }).spawn();


            await new BarrierTile({
                x: x * 32,
                y: 13 * 32,
                spriteName: "invisible",
                area
            }).spawn();
        }

        for (let y = 0; y < 10; y++) {
            await new BarrierTile({
                x: 2 * 32,
                y: (y + 3) * 32,
                spriteName: "invisible",
                area
            }).spawn();

            await new BarrierTile({
                x: 13 * 32,
                y: (y + 3) * 32,
                spriteName: "invisible",
                area
            }).spawn();
        }

        for (let i = 0; i < 2; i++) {
            await new TriggerTile({
                area,
                isBarrier: false,
                spriteName: "floormat",
                x: (7 + i) * 32,
                y: 12 * 32
            }, async (player) => {
                player.setControlsEnabled(false);
                await GLOBALS.sceneManager.loadScene("world");
            }).spawn()
        }

        const counter = await loadSpritesheet("kittycenter-counter");
        counter.x = 6 * 32;
        counter.y = 3 * 32;
        counter.loop = false;
        counter.animationSpeed = 0.02;
        area.container.addChild(counter);

        await new TriggerTile(
            { area, x: 7.5 * 32, y: 5 * 32, spriteName: "invisible" },
            async (player) => {
                GLOBALS.animationController.animate({
                    duration: 500,
                    onFinished: () => {
                        counter.play();
                    },
                    to: { x: 7.5 * 32, y: 5 * 32 },
                    sprite: player.sprite
                })
                // TODO dialog to ask if user wants to heal
                player.setControlsEnabled(false);
                counter.onComplete = () => {
                    counter.currentFrame = 0;
                    player.setControlsEnabled(true);
                    // TODO heal mons
                }
            }
        ).spawn()

        this.player.setArea(area);
        this.player.setControlsEnabled(true);
    }

    async unloadScene() {
        this.player?.destroy();
        game.stage.removeChildren();
    }
}