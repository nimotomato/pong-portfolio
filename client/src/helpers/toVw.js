// Turns pixels into vh
export const toVw = (pixels) => {
  return 100 * (pixels / window.innerWidth);
};
