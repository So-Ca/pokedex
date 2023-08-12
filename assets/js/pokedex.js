let pokemon
fetch("assets/json/pokedex.json")
.then(response => {
  return response.json()
})
.then(data => {
  pokemon = data
  generaCards(pokemon)
})
.catch(err => {})

function generaCards(listaPokemon) {
  const pokedex = document.getElementById("pokedex")
  while(pokedex.firstChild) {
    pokedex.removeChild(pokedex.firstChild)
  }
  listaPokemon.forEach(pokemon => {
    const card = `<div class="pkm">
        <img src="pokemon.json-master/images/${formatID(pokemon.id)}.png" class="pkm-img">
        <h3 class="pkm-name">${pokemon.name.english}</h3>
      </div>`
      pokedex.insertAdjacentHTML("beforeend", card)
  }); 
}

function formatID(id) {
  if(id.toString().length == 1) return `00${id}`
  else if(id.toString().length == 2) return `0${id}`
  return id
}

const searchBar = document.getElementById("search-bar")
searchBar.addEventListener("keyup", (e) => {
  let pokemonFiltrati = []
  if(e.target.value === "") {
    document.getElementById("pokedex").style.display = "none";
  } else if(e.target.value.startsWith("type:")){
    const value = e.target.value.replace("type:", "")
    pokemonFiltrati = pokemon.filter(pkmn => {
      return pkmn.type.indexOf(value) != -1
    })
  } else {
      pokemonFiltrati = pokemon.filter(pkmn => {
      return pkmn.name.english.startsWith(e.target.value)
    })
  }
  if(pokemonFiltrati.length > 0) {
    document.getElementById("pokedex").style.display = "block";
  }
  generaCards(pokemonFiltrati)
})