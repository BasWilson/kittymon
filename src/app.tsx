import { useEffect, useState } from "preact/hooks";
import { Scene } from "./engine/scene";
import { GLOBALS } from "./main";
import { GameScreen } from "./ui/screens/game-screen";

export function App() {

  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    GLOBALS.uiEvents.on("scene:update", (scene: Scene) => {
      setScene(scene);
    });

    return () => {
      GLOBALS.uiEvents.off("scene:update");
    }
  }, [])

  return (
    <>
      <div className="top-0 right-0 fixed text-xs w-fit text-black bg-blue-300 px-1 flex flex-col">
        <span>ui screen: {scene?.uiId || "No UI loaded"}</span>
        <span>scene: {scene?.name || "No Scene loaded"}</span>
      </div>
      {scene?.uiId === "game" && <GameScreen />}
    </>
  )
}
