export const generateId = () => {
    return Math.random().toString(36).slice(2, 9);
};

export const saveToLocalStorage = (key: string, data: unknown) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
}