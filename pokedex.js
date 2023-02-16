const pokedex$$ = document.getElementById("pokedex");
const init = async () => {
  const arraypokemons = await traerPokemons();
  pintarPokemons(arraypokemons);
  sacarArrayTipos(arraypokemons);
  dibujarBusqueda(arraypokemons);
};
init();

async function traerPokemons() {
  const pokemons = [];
  for (let i = 1; i < 201; i++) {
    try {
      const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${[i]}`);
      const pokemonObj = await resultado.json();
      pokemons.push(pokemonObj);
    } catch (err) {
      console.log(err);
    }
  }

  const pokemonsFiltrados = pokemons.map((pokemon) => ({
    name: pokemon.name,
    image: pokemon.sprites["other"]["official-artwork"]["front_default"],
    type: pokemon.types.map((type) => type.type.name),
    id: pokemon.id,
  }));
  return pokemonsFiltrados;
}
function pintarPokemons(pokemons) {
  pokedex$$.innerHTML = "";

  for (const pokemon of pokemons) {
    const li$$ = document.createElement("li");
    const divPokemon$$ = document.createElement("div");
    divPokemon$$.setAttribute("class", "card ");
    const h2$$ = document.createElement("h2");
    h2$$.innerHTML = pokemon.name;
    h2$$.setAttribute("class", "card-title");
    const image$$ = document.createElement("img");
    image$$.setAttribute("src", pokemon.image);
    image$$.setAttribute("alt", pokemon.name);
    image$$.setAttribute("class", "card-image");
    const pId$$ = document.createElement("p")
    pId$$.innerHTML = `Nº000${pokemon.id}`
    pId$$.setAttribute("class", "p")
    divPokemon$$.appendChild(pId$$)
    divPokemon$$.appendChild(h2$$);
    divPokemon$$.appendChild(image$$);

    for (const type of pokemon.type) {
      const ptype$$ = document.createElement("p");
      ptype$$.innerHTML = type;
      claseColores(ptype$$);
      divPokemon$$.appendChild(ptype$$);
    }
    

    li$$.appendChild(divPokemon$$);
    pokedex$$.appendChild(li$$);
  }
}

function filtrarPokemonsNombre(filtro, pokemons) {
  let pokemonsFiltrados = pokemons.filter((pokemon) =>
    pokemon.name.includes(filtro)
  );
  pintarPokemons(pokemonsFiltrados);
}
function dibujarBusqueda(pokemons) {
  pokedex$$.innerHTML = "";
  pintarPokemons(pokemons);
  const input$$ = document.getElementById("input");
  input$$.addEventListener("input", () => {
    filtrarPokemonsNombre(input$$.value, pokemons);
  });
}

function claseColores(tipo) {
  if (tipo.innerHTML === "shadow") {
    tipo.setAttribute("class", "card-subtitle-shadow");
    tipo.innerHTML = `${tipo.innerHTML}  👥`;
  } else if (tipo.innerHTML === "normal") {
    tipo.setAttribute("class", "card-subtitle-normal");
  } else if (tipo.innerHTML === "fighting") {
    tipo.setAttribute("class", "card-subtitle-fighting");
    tipo.innerHTML = `${tipo.innerHTML}  👊`;
  } else if (tipo.innerHTML === "flying") {
    tipo.setAttribute("class", "card-subtitle-flying");
    tipo.innerHTML = `${tipo.innerHTML}  ✈`;
  } else if (tipo.innerHTML === "poison") {
    tipo.setAttribute("class", "card-subtitle-poison");
    tipo.innerHTML = `${tipo.innerHTML}  ☠️`;
  } else if (tipo.innerHTML === "ground") {
    tipo.setAttribute("class", "card-subtitle-ground");
    tipo.innerHTML = `${tipo.innerHTML}  🍄`;
  } else if (tipo.innerHTML === "rock") {
    tipo.setAttribute("class", "card-subtitle-rock");
    tipo.innerHTML = `${tipo.innerHTML}  🗿`;
  } else if (tipo.innerHTML === "bug") {
    tipo.setAttribute("class", "card-subtitle-bug");
    tipo.innerHTML = `${tipo.innerHTML}  🐛`;
  } else if (tipo.innerHTML === "ghost") {
    tipo.setAttribute("class", "card-subtitle-ghost");
    tipo.innerHTML = `${tipo.innerHTML}  👻`;
  } else if (tipo.innerHTML === "steel") {
    tipo.setAttribute("class", "card-subtitle-ghost");
    tipo.innerHTML = `${tipo.innerHTML}  🔩`;
  } else if (tipo.innerHTML === "fire") {
    tipo.setAttribute("class", "card-subtitle-fire");
    tipo.innerHTML = `${tipo.innerHTML}  🔥`;
  } else if (tipo.innerHTML === "water") {
    tipo.setAttribute("class", "card-subtitle-water");
    tipo.innerHTML = `${tipo.innerHTML}  💧`;
  } else if (tipo.innerHTML === "grass") {
    tipo.setAttribute("class", "card-subtitle-grass");
    tipo.innerHTML = `${tipo.innerHTML}  🌿`;
  } else if (tipo.innerHTML === "electric") {
    tipo.setAttribute("class", "card-subtitle-electric");
    tipo.innerHTML = `${tipo.innerHTML}  ⚡`;
  } else if (tipo.innerHTML === "psychic") {
    tipo.setAttribute("class", "card-subtitle-psychic");
    tipo.innerHTML = `${tipo.innerHTML}  🍥`;
  } else if (tipo.innerHTML === "ice") {
    tipo.setAttribute("class", "card-subtitle-ice");
    tipo.innerHTML = `${tipo.innerHTML}  ❄️`;
  } else if (tipo.innerHTML === "dragon") {
    tipo.setAttribute("class", "card-subtitle-dragon");
    tipo.innerHTML = `${tipo.innerHTML}  🐉`;
  } else if (tipo.innerHTML === "dark") {
    tipo.setAttribute("class", "card-subtitle-dark");
    tipo.innerHTML = `${tipo.innerHTML}  🌑`;
  } else if (tipo.innerHTML === "fairy") {
    tipo.setAttribute("class", "card-subtitle-fairy");
    tipo.innerHTML = `${tipo.innerHTML}  🧚`;
  } else if (tipo.innerHTML === "uknown") {
    tipo.setAttribute("class", "card-subtitle-uknown");
    tipo.innerHTML = `${tipo.innerHTML}  ❔`;
  }
}
function sacarArrayTipos(array) {
  arrayTipos = [];
  for (const pokemon of array) {
    for (const type of pokemon.type) {
      if (!arrayTipos.includes(type)) {
        arrayTipos.push(type);
      }
    }
  }
  dibujarBotones(arrayTipos, array);
}

function dibujarBotones(array1, array2) {
  const divTipos$$ = document.getElementById("div-tipos");
  const botonTodos$$ = document.getElementById("pintar-todos");
  const input$$ = document.getElementById("input");
  botonTodos$$.addEventListener("click", () => {
    dibujarBusqueda(array2);
    input$$.value = "";
  });
  for (tipo of array1) {
    const boton$$ = document.createElement("button");
    boton$$.innerHTML = tipo;
    boton$$.setAttribute("id", tipo)
    boton$$.setAttribute("class", `card-subtitle-${tipo} col-4`)
    divTipos$$.appendChild(boton$$);
    funcionBotones(boton$$, array2);
  }
}

function funcionBotones(boton, array) {
  const input$$ = document.getElementById("input");
  boton.addEventListener("click", () => {
    const nuevoArray = array.filter((pokemon) =>
      pokemon.type.includes(boton.innerHTML)
    );
    input$$.value = "";
    dibujarBusqueda(nuevoArray);
  });
}

/*  let pokemonsTipo = []
    if (!select$$.value === "todos") {
      pokemonsTipo = pokemons.filter((pokemon)=>{
        pokemon.type[0].type.name.includes(select$$.value) 
        })
       console.log(pokemonsTipo);
       return pokemonsTipo
    } else {
       return pokemons
    } */
/* function filtrarPorTipo(filtro, pokemons){
  if (!filtro.value === "todos") {
    select$$.addEventListener("change",()=>{
      let pokemonsPorTipo = pokemons.filter.type.includes(filtro.value)
      return pokemonsPorTipo})} else {
        return pokemons
      }
  
   select$$.addEventListener("change",()=>{
    for (constpokemon of pokemons)
    if (pokemons.type.includes(filtro.value)){
    return pokemons.filter((pokemon) => pokemon.type.includes(filtro.value))
    } else {
      return pokemons
    }
  }) 

} */
