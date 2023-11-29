//-------------------storage------------
export const UserStorage = "TokenUserStore";
export function setStore(name, data) {
    let sData = JSON.stringify(data);
    localStorage.setItem(name, sData);
}

export function getStore(name) {
    if (localStorage.getItem(name)) {
        let sData = localStorage.getItem(name);
        let data = JSON.parse(sData);
        return data;
    }
    return {};
}
