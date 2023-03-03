// Gets bound rect of html object. Saves space. 
export const getRect = (className) => {
    return document.querySelector(className).getBoundingClientRect();
}