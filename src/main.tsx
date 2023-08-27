import { loadAssets } from '@/game/assets.ts'
import { App } from '@/ui/app'
import '@/ui/index.css'
import * as PIXI from 'pixi.js'
import { render } from 'preact'
import { AnimationController } from './engine/animation'
import { SceneManager } from './engine/scene'
import { BattleScene } from './game/scenes/battle-scene'
import { KittyCenterScene } from './game/scenes/kittycenter-scene'
import { WorldScene } from './game/scenes/world-scene'
import { StateManager } from './game/state'

render(<App />, document.getElementById('app')!)

export const game = new PIXI.Application({
  width: 500,
  height: 500,
  backgroundColor: 0xffffff,
  resolution: window.devicePixelRatio || 1,
});

export const GLOBALS = {
  stateManager: new StateManager(),
  sceneManager: new SceneManager(),
  animationController: new AnimationController(),
  uiEvents: new PIXI.utils.EventEmitter(),
}

loadAssets().then(() => {
  const { sceneManager, animationController } = GLOBALS;
  animationController.setup();
  sceneManager.addScene(new WorldScene());
  sceneManager.addScene(new BattleScene());
  sceneManager.addScene(new KittyCenterScene());
  sceneManager.loadScene("world");
});

document.body.appendChild(game.view as unknown as Node);
