const pokemonController = new PokemonController();

// Fonction pour obtenir la liste des Pokémons par type
function getPokemonsByType(typeName) {
    const pokemonsByType = [];
    for (const pokemon of pokemonController.pokemonList) {
        for (const type of pokemon.types) {
            if (type.type_name === typeName) {
                pokemonsByType.push(pokemon);
                break;
            }
        }
    }
    return pokemonsByType;
}

const pokemonsOfType = getPokemonsByType('NomType');
console.log("Poke type 'NomType' :", pokemonsOfType);


