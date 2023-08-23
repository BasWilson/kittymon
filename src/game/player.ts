import { keyboard } from "@/engine/input";
import { loadSprite } from "@/engine/sprites";
import { Area } from "@/game/area";
import { game } from "@/main";
import * as PIXI from "pixi.js";

export class Player {

  sprite: PIXI.Sprite;
  keyboardEvents: any[] = [];
  playerStep = 1;
  movingTo: "left" | "right" | "up" | "down" | null = null;
  lastMove = Date.now();
  controlsEnabled = false;
  previousTiles: number[] | null = null;
  activeArea: Area | null = null;

  constructor() {
    this.sprite = new PIXI.Sprite();
    loadSprite("player").then((sprite) => {
      this.sprite.texture = sprite.texture;
      this.sprite.scale = new PIXI.Point(.5, .5);
      this.sprite.x = 4 * 32;
      this.sprite.y = 4 * 32;
      game.stage.addChild(this.sprite);
    });

    game.ticker.add(this.update, this);

    this.keyboardEvents = [
      keyboard(
        "ArrowLeft",
        () => {
          this.movingTo = "left";
        },
        () => {
          if (this.movingTo === "left")
            this.movingTo = null;
        }
      ),

      keyboard(
        "ArrowRight",
        () => {
          this.movingTo = "right";
        },
        () => {
          if (this.movingTo === "right")
            this.movingTo = null;
        }
      ),

      keyboard(
        "ArrowUp",
        () => {
          this.movingTo = "up";
        },
        () => {
          if (this.movingTo === "up")
            this.movingTo = null;
        }
      ),

      keyboard(
        "ArrowDown",
        () => {
          this.movingTo = "down";
        },
        () => {
          if (this.movingTo === "down")
            this.movingTo = null;
        }
      )
    ]
  }

  setControlsEnabled(enabled: boolean) {
    this.controlsEnabled = enabled;
  }

  destroy() {
    this.keyboardEvents.forEach((event) => {
      event.unsubscribe();
    });
    game.ticker.remove(this.update, this);
  }

  update() {
    if (!this.controlsEnabled) return;
    if (this.movingTo) {
      this.move(this.movingTo);
    }
  }

  move(direction: "up" | "down" | "left" | "right") {
    const newX = this.sprite.x + (direction === "left" ? -this.playerStep : direction === "right" ? this.playerStep : 0);
    const newY = this.sprite.y + (direction === "up" ? -this.playerStep : direction === "down" ? this.playerStep : 0);
    let canMove = true;

    const areaTiles = this.activeArea?.tiles;
    const hitTiles: number[] = [];
    areaTiles?.forEach((tile) => {
      const newPoint = new PIXI.Point(newX, newY);
      const bounds1 = new PIXI.Rectangle(newPoint.x, newPoint.y, this.sprite.width, this.sprite.height);
      if (tile.sprite) {
        const bounds2 = tile.sprite.getBounds();
        const hit = bounds1.x < bounds2.x + bounds2.width
          && bounds1.x + bounds1.width > bounds2.x
          && bounds1.y < bounds2.y + bounds2.height
          && bounds1.y + bounds1.height > bounds2.y;
        if (hit) {
          hitTiles.push(tile.id);
          if (tile.props.isBarrier) {
            canMove = false;
            return;
          }
        }
      }
    });

    if (hitTiles.length > 0) {
      hitTiles.forEach((tileId) => {
        if (this.previousTiles?.includes(tileId)) return;
        const tile = areaTiles?.find((tile) => tile.id === tileId);
        tile?.trigger?.(this);
      });
    }

    this.previousTiles = hitTiles;

    if (canMove) {
      this.lastMove = Date.now();
      this.sprite.x = this.sprite.x + (this.playerStep * game.ticker.deltaTime * (direction === "left" ? -1 : direction === "right" ? 1 : 0));
      this.sprite.y = this.sprite.y + (this.playerStep * game.ticker.deltaTime * (direction === "up" ? -1 : direction === "down" ? 1 : 0));
    }
  }

  setArea(area: Area) {
    this.activeArea = area;
  }
}
