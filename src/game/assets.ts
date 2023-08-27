import * as PIXI from "pixi.js";

const assetManifest = {
  bundles: [
    {
      name: "sprites",
      assets: [
        {
          name: "player",
          srcs: "assets/sprites/player/player.json"
        },
        {
          name: "grass",
          srcs: "assets/sprites/grass/grass.json"
        },
        {
          name: "tree",
          srcs: "assets/sprites/tree/tree.json"
        },
        {
          name: "invisible",
          srcs: "assets/sprites/invisible/invisible.json"
        },
        {
          name: "waves",
          srcs: "assets/sprites/waves/waves.json"
        },
        {
          name: "woodenfloor",
          srcs: "assets/sprites/woodenfloor/woodenfloor.json"
        },
        {
          name: "floormat",
          srcs: "assets/sprites/floormat/floormat.json"
        },
        {
          name: "kittycenter",
          srcs: "assets/sprites/kittycenter/kittycenter.json"
        },
        {
          name: "kittycenter-counter",
          srcs: "assets/sprites/kittycenter/kittycenter-counter.json"
        }
      ]
    }
  ]
}

export const loadAssets = async () => {
  await PIXI.Assets.init({ manifest: assetManifest });

  PIXI.Assets.backgroundLoadBundle([
    "sprites"
  ]);
}
