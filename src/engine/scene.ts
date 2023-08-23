import { GLOBALS } from "@/main";

export type UiId = "game" | "menu" | "battle";
export type SceneId = "world" | "battle";

export type SceneProps = {
    name: SceneId;
    buildScene: () => Promise<void>;
    uiId: UiId;
}

export interface Scene {
    name: SceneId;
    uiId: UiId;
    buildScene: () => Promise<void>;
    unloadScene: () => Promise<void>;
}

export class SceneManager {
    scenes = new Map<SceneId, Scene>();
    activeScene: Scene | null = null;

    addScene(scene: Scene) {
        this.scenes.set(scene.name, scene);
    }

    async loadScene(name: SceneId) {
        const scene = this.scenes.get(name);
        if (!scene) {
            throw new Error(`Scene called "${name}" not found`);
        }
        if (this.activeScene) {
            await this.unloadScene(this.activeScene);
        }
        await scene.buildScene();
        this.activeScene = scene;
        GLOBALS.uiEvents.emit("scene:update", this.activeScene);
    }

    async unloadScene(scene: Scene) {
        await scene.unloadScene();
        this.activeScene = null;
        GLOBALS.uiEvents.emit("scene:update", this.activeScene);
    }
}