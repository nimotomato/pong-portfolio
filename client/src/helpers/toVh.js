// Turns pixels into vh
export const toVh = (pixels) => {
    return 100 * (pixels / window.innerHeight);
}