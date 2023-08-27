type WorldPosition = {
    level: number,
    x: number,
    y: number
}

type State = {
    worldPosition: WorldPosition
}
export class StateManager {

    state: State = {
        worldPosition: {
            level: 0,
            x: 4 * 32,
            y: 4 * 32
        }
    }

    setState(newState: Partial<State>) {
        this.state = {
            ...this.state,
            ...newState
        }
    }
}