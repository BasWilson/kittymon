import { loadSpritesheet } from "@/engine/sprites";
import { GLOBALS } from "@/main";
import * as PIXI from "pixi.js";
import { Area } from "../area";
import { TriggerTile } from "../tiles";

export class KittyCenterBuilding {

    container: PIXI.Container = new PIXI.Container();
    sprite: PIXI.AnimatedSprite | null = null;

    constructor(public area: Area) {

    }

    async spawn() {
        this.sprite = await loadSpritesheet("kittycenter");

        this.container.addChild(this.sprite);
        this.sprite.animationSpeed = 0.4
        this.sprite.loop = false;
        this.sprite.currentFrame = 0;

        const triggerTile = await new TriggerTile({
            x: 8 * 32,
            y: 6 * 32,
            spriteName: "invisible",
            area: this.area,
        }, async (player) => {
            player.setControlsEnabled(false);
            GLOBALS.animationController.animate({
                sprite: player.sprite,
                duration: 500,
                to: {
                    x: 8 * 32,
                    y: 6 * 32,
                },
                onFinished: () => {
                    this.sprite?.play();
                }
            })
        }).spawn()

        this.sprite.onComplete = async () => {
            // animate black screen
            // door as entry point
            GLOBALS.stateManager.setState({
                worldPosition: {
                    x: triggerTile.container.x,
                    y: triggerTile.container.y + 32,
                    level: 0
                }
            });

            // teleport to interior
            await GLOBALS.sceneManager.loadScene("kitty_center");
        }
    }

    async onEnter() {
        if (!this.sprite) return;
        this.sprite.currentFrame = 0;
        this.sprite.play();
    }
}