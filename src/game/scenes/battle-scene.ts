import { Scene, SceneId, UiId } from "@/engine/scene";

export class BattleScene implements Scene {
    name: SceneId = "battle";
    uiId: UiId = "battle";

    async buildScene() {
        console.log("building battle scene");
    }

    async unloadScene() {
    }
}