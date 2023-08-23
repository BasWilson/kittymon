import { Scene, SceneId, UiId } from "@/engine/scene";

export class BattleScene implements Scene {

    // scene interface variables
    name: SceneId = "battle";
    uiId: UiId = "battle";

    // scene specific variables


    async buildScene() {
        console.log("building battle scene");
    }

    async unloadScene() {
    }
}