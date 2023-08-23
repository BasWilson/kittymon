import { App } from '@/app.tsx'
import { loadAssets } from '@/game/assets.ts'
import '@/index.css'
import * as PIXI from 'pixi.js'
import { render } from 'preact'
import { SceneManager } from './engine/scene'
import { BattleScene } from './game/scenes/battle-scene'
import { WorldScene } from './game/scenes/world-scene'

render(<App />, document.getElementById('app')!)

export const game = new PIXI.Application({
  width: 500,
  height: 500,
  backgroundColor: 0xffffff,
  resolution: window.devicePixelRatio || 1,
});

export const GLOBALS = {
  sceneManager: new SceneManager(),
  uiEvents: new PIXI.utils.EventEmitter(),
}

loadAssets().then(() => {
  GLOBALS.sceneManager.addScene(new WorldScene());
  GLOBALS.sceneManager.addScene(new BattleScene());
  GLOBALS.sceneManager.loadScene("world");
});

document.body.appendChild(game.view as unknown as Node)
