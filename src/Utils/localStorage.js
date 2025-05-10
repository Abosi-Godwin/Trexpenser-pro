export const setItem = (key, value) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(e.message);
    }
};
export const getItem = key => {
    try {
        const theme = JSON.parse(window.localStorage.getItem(key));
        return theme
    } catch (e) {
        console.error(e.message);
    }
};
