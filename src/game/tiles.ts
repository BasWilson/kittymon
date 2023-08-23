import { id } from "@/engine/id";
import { loadSprite, loadSpritesheet } from "@/engine/sprites";
import { GLOBALS } from "@/main";
import * as PIXI from "pixi.js";
import { Area } from "./area";
import { Player } from "./player";

export type TileProps = {
  x: number,
  y: number,
  spriteName?: string,
  area?: Area,
  blockMovement?: boolean,
  onSpawn?: (tile: Tile) => void
}

export type AnimatedTileProps = {
  x: number,
  y: number,
  spriteName?: string,
  animationSpeed?: number,
  area?: Area,
  blockMovement?: boolean,
  onSpawn?: (tile: AnimatedTile) => void
}

export interface Tile {
  id: number;
  sprite: PIXI.Sprite | PIXI.AnimatedSprite | null;
  props: TileProps | AnimatedTileProps;
  spawn(props: TileProps): Promise<Tile>;
  spawn(props: AnimatedTileProps): Promise<Tile>;
  trigger?(player: Player): void;
}

export class BasicTile implements Tile {
  sprite: PIXI.Sprite | null = null;
  id: number = id();
  constructor(
    public props: TileProps,
  ) { }

  async spawn() {
    if (!this.props.spriteName) return this;
    const sprite = await loadSprite(this.props.spriteName);
    this.sprite = sprite;
    this.sprite.x = this.props.x
    this.sprite.y = this.props.y
    this.sprite.name = this.props.spriteName;
    if (this.props.area?.container) {
      this.props.area.container.addChild(this.sprite);
    }
    this.props?.onSpawn?.(this);
    this.props.area?.addTile(this);
    return this;
  }
}

export class AnimatedTile implements Tile {
  sprite: PIXI.AnimatedSprite | null = null;
  id: number = id();
  constructor(
    public props: AnimatedTileProps,
  ) { }

  async spawn() {
    if (!this.props.spriteName) return this;
    const sprite = await loadSpritesheet(this.props.spriteName);
    this.sprite = sprite;
    this.sprite.x = this.props.x;
    this.sprite.y = this.props.y;
    this.sprite.animationSpeed = this.props.animationSpeed || 0.02;
    this.sprite.name = this.props.spriteName;
    if (this.props.area?.container) {
      this.props.area.container.addChild(this.sprite);
    }
    this.props?.onSpawn?.(this);
    this.props.area?.addTile(this);
    return this;
  }
}


export class WaveTile extends AnimatedTile {
  constructor(props: AnimatedTileProps) {
    super({
      ...props,
      spriteName: "waves",
      onSpawn: (tile) => {
        tile.sprite?.play();
      }
    })
  }
}

export class GrassTile extends BasicTile {
  constructor(props: TileProps) {
    super({
      ...props,
      spriteName: "grass",
    })
  }
}

export class TallGrassTile extends AnimatedTile {
  constructor(props: TileProps) {
    super({
      ...props,
      animationSpeed: 0.02,
      spriteName: "tallgrass",
      onSpawn(tile) {
        tile.sprite?.play();
      }
    })
  }
  trigger(player: Player) {
    const rand = Math.random();
    if (rand < 0.333) {
      player.setControlsEnabled(false);
      GLOBALS.sceneManager.loadScene("battle");
    }
  }
}


export class BarrierTile extends BasicTile {
  constructor(props: TileProps) {
    super({
      ...props,
      blockMovement: true,
      spriteName: "tree",
    })
  }
}