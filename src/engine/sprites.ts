import * as PIXI from 'pixi.js'

export const loadSpritesheet = async (name: string) => {
  const sheet = await PIXI.Assets.load(`./assets/sprites/${name}/${name}.json`);
  sheet.parse();
  sheet.animations[name] = Object.keys(sheet.textures)

  return new PIXI.AnimatedSprite(
    sheet.animations[name].map((animationName: string) => sheet.textures[animationName])
  );
}

export const loadSprite = async (name: string) => {
  const sprite = await PIXI.Assets.load(`./assets/sprites/${name}/${name}.json`);
  return new PIXI.Sprite(sprite.textures[0]);
}
