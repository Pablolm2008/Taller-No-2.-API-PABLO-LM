const API = "https://pokeapi.co/api/v2/pokemon?limit=50";
const cache = new Map();

export async function getPokemons() {
    try {
        const res = await fetch(API);
        if (!res.ok) {
            throw new Error("Error al obtener la lista");
        }
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error(" Error en getPokemons:", error);
        return [];
    }
}

export async function getDetail(url) {
    try {
        if (cache.has(url)) {
            return cache.get(url);
        }
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Error al obtener detalle");
        }
        const data = await res.json();
        cache.set(url, data);
        return data;

    } catch (error) {
        console.error("Error en getDetail:", error);
        return null;
    }
}