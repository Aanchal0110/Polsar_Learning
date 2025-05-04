const backendUrl = `${window.location.origin}/`;

export async function setData(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
}

export async function getData(key) {
    const data = sessionStorage.getItem(key);
    return data;
}

