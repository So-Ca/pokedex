let pokemon;

// Chiamata al file json
fetch("pokemon.json-master/pokedex.json")
.then(response => response.json())
.then(data => { pokemon = data; console.log(pokemon) })
.catch(error => { return `<div class="error-message">Ops, c'è stato un errore nel caricamento dei pokemon: ${error.message}</div>`});

// Funzione che genera le cards
function generaCards(listaPokemon) {
  const pokedex = document.getElementById("pokedex");

// Rimuove card precedenti quando la lista viene aggiornata dalla barra di ricerca
  while(pokedex.firstChild) {
    pokedex.removeChild(pokedex.firstChild)
  }
  
  listaPokemon.forEach(pokemon => {
    const card = `
      <div class="pkm">
        <img class="pkm-img" src="pokemon.json-master/images/${formatID(pokemon.id)}.png">
        <h3 class="pkm-name">${pokemon.name.english}</h3>
      </div>
    `;
    pokedex.insertAdjacentHTML("beforeend", card);
  }); 
}

// funzione per formattare l'id degli oggetti json
function formatID(id) {
  if(id.toString().length == 1) return `00${id}`
  else if(id.toString().length == 2) return `0${id}`
  return id
}
// funzione per far vedere le stat dei pkm
function mostraInfo(pokemonSelezionato){
  const blackDisplay = document.querySelector(".black-display");
  
  blackDisplay.innerHTML = `
  Nome: ${pokemonSelezionato.name.english}<br>
  Tipo: ${pokemonSelezionato.type.join(", ")}<br>
  Vita: ${pokemonSelezionato.base.HP}<br>
  Attacco: ${pokemonSelezionato.base.Attack}<br>
  Difesa: ${pokemonSelezionato.base.Defense}<br>
  Attacco Speciale: ${pokemonSelezionato.base["Sp. Attack"]}<br>
  Difesa Speciale: ${pokemonSelezionato.base["Sp. Defense"]}<br>
  Velocità: ${pokemonSelezionato.base.Speed}<br>
  `;
}

// Utilizzo della barra di ricerca
const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("keyup", (e) => {
  let pokemonFiltrati = [];

  if(e.target.value.trim() === ""){
    const pokedex = document.getElementById("pokedex");
    pokedex.innerHTML = "";
  } else if(e.target.value.startsWith("type:")){
    const value = e.target.value.replace("type:", "")
    pokemonFiltrati = pokemon.filter(pkmn => {
      return pkmn.type.some(type => type.toLowerCase().includes(value.toLowerCase()));
    })
  } else {
      pokemonFiltrati = pokemon.filter(pkmn => {
      return pkmn.name.english.toLowerCase().startsWith(e.target.value.toLowerCase());
    })
  }

  generaCards(pokemonFiltrati);

  if(pokemonFiltrati.length > 0){
    mostraInfo(pokemonFiltrati[0]);
  } else {
    const blackDisplay = document.querySelector(".black-display");
    blackDisplay.innerHTML = "";
  }
});