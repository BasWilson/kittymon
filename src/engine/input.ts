export function keyboard(
  value: string,
  onPress: () => void,
  onRelease: () => void
) {
  const key = {
    value: value,
    isDown: false,
    isUp: true,
    downHandler: (event: KeyboardEvent) => {
      if (event.key === key.value) {
        if (key.isUp) {
          onPress();
        }
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    },
    upHandler: (event: KeyboardEvent) => {
      if (event.key === key.value) {
        if (key.isDown) {
          onRelease();
        }
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    },
    unsubscribe: () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    }
  };

  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  return key;
}
