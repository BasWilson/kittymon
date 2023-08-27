export const waitFor = (time: number) => {
    return new Promise((res, _) => setTimeout(res, time))
}