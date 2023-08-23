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
          name: "waves",
          srcs: "assets/sprites/waves/waves.json"
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
