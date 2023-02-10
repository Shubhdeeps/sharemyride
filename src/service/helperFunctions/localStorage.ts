const storageName = "favourite-routes"

export const setFavourites = (routeId: string) => {
    const storedData = localStorage.getItem(storageName);
    const data: string[] = [];
    if(storedData){
        data.push(JSON.parse(storedData));
    }

    const routes = [routeId, ...data]
    localStorage.setItem(storageName, JSON.stringify(routes));
}

export const getFavourites = (setData: Function) => {
    const storedData = localStorage.getItem(storageName);
    if(storedData){
        const data = JSON.parse(storedData);
        setData(data);
    }
}