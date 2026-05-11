import { getPokemons, getDetail } from "./api.js";

const list = document.getElementById("pokemonList");
const search = document.getElementById("search");
const filter = document.getElementById("typeFilter");
const loader = document.getElementById("loader");

let pokemons = [];

async function load() {
    loader.style.display = "block";
    const data = await getPokemons();
    for (let p of data) {
        const detail = await getDetail(p.url);
        if (detail) {
            pokemons.push(detail);
            render(pokemons); 
        }
    }
    loader.style.display = "none";
}

function render(data) {
    list.innerHTML = "";
    data.forEach(p => {
        const card = document.createElement("div");
        card.className = "flip-card";
        card.innerHTML = `
        <div class="inner">
            <!-- FRONT -->
            <div class="front">
                <div class="card-header">
                    <h3>${p.name.toUpperCase()}</h3>
                    <span class="hp">❤️ ${p.stats[0].base_stat} PS</span>
                </div>
                <img src="${p.sprites.front_default}" alt="${p.name}">
                <div class="types">
                    ${p.types.map(t => `<span>${t.type.name}</span>`).join("")}
                </div>
            </div>

            <!-- BACK -->
            <div class="back">
                <h3>${p.name.toUpperCase()}</h3>
                <p>⚔️ Ataque: ${p.stats[1].base_stat}</p>
                <p>🛡️ Defensa: ${p.stats[2].base_stat}</p>
                <p>⚡ Velocidad: ${p.stats[5].base_stat}</p>
                <p class="info">Toca para volver</p>
            </div>

        </div>
        `;

        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
        list.appendChild(card);
    });
}

search.oninput = () => {
    const val = search.value.toLowerCase();
    const filtered = pokemons.filter(p =>
        p.name.includes(val)
    );
    render(filtered);
};

filter.onchange = () => {
    const val = filter.value;
    if (!val) {
        render(pokemons);
        return;
    }
    const filtered = pokemons.filter(p =>
        p.types.some(t => t.type.name === val)
    );
    render(filtered);
};

load();
