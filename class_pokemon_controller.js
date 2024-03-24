class PokemonController {
    constructor() {
        this.generationList = [];
        this.pokemonList = [];
        this.attacksList = [];
        this.typesList = [];
        this.initialize();
        this.importPokemonData();
    }

    initialize() {
        for (let genData of generation) {
            const genValues = Object.values(genData);
            this.generationList.push(...genValues);
        }
    }

    findGenerationForPokemon(pokeId) {
        const flatGenerationList = this.generationList.flat();
        const generation = flatGenerationList.find(gen => gen.id === pokeId);
        return generation || null;
    }
    

    processMovesList(moves, movesMap) {
        const processedMoves = [];
        for (let moveName of moves) {
            if (movesMap[moveName]) {
                const moveData = movesMap[moveName];
                const attackFound = this.searchForAttack(moveData.move_id);
                if (!attackFound) {
                    const newAttack = new Attack(moveData.duration, moveData.energy_delta, moveData.move_id, moveData.name, moveData.power, moveData.stamina_loss_scaler, moveData.critical_chance);
                    this.attacksList.push({ move_id: newAttack.id, ...newAttack });
                    processedMoves.push(newAttack);
                } else {
                    processedMoves.push(attackFound);
                }
            }
        }
        return processedMoves.filter(move => move); 
    }

    importPokemonData() {
        const typeMap = {};
        for (let typeData of pokemon_type) {
            if (typeData.form === 'Normal') {
                const pokeId = typeData.pokemon_id;
                if (!typeMap[pokeId]) {
                    typeMap[pokeId] = [];
                }
                typeMap[pokeId].push(typeData.type);
            }
        }

        const fastMoveMap = this.constructMoveMap(fast_moves);
        const chargedMoveMap = this.constructMoveMap(charged_moves);

        for (let pokeData of pokemon) {
            if (pokeData.form !== 'Normal') continue;

            const { pokemon_id: id, pokemon_name: name } = pokeData;
            const generationData = this.findGenerationForPokemon(id);

            const typesData = [];
            if (typeMap[id]) {
                for (let typeNameData of typeMap[id]) {
                    for (let singleType of typeNameData) {
                        let typeObject = this.searchForType(singleType);
                        if (!typeObject) {
                            const typeInfo = type_effectiveness[0][singleType];
                            typeObject = new Types(singleType, typeInfo);
                            this.typesList.push({ type_name: typeObject.type_name, ...typeObject });
                        }
                        if (!typesData.find(t => t.type_name === typeObject.type_name)) {
                            typesData.push(typeObject);
                        }
                    }
                }
            }

            const pokeAttacksData = pokemon_moves.find(poke => poke.pokemon_id === id && poke.pokemon_name === name);

            const fastMovesData = this.processMovesList(pokeAttacksData.fast_moves, fastMoveMap);
            const chargedMovesData = this.processMovesList(pokeAttacksData.charged_moves, chargedMoveMap);
            const eliteFastMovesData = this.processMovesList(pokeAttacksData.elite_fast_moves, fastMoveMap);
            const eliteChargedMovesData = this.processMovesList(pokeAttacksData.elite_charged_moves, chargedMoveMap);

            const pokemonObj = new Pokemon(id, name, pokeData.form, pokeData.base_attack, pokeData.base_defense, pokeData.base_stamina, generationData, 1, typesData, chargedMovesData, eliteChargedMovesData, eliteFastMovesData, fastMovesData);
            this.pokemonList.push({ pokemon_id: pokemonObj.pokemon_id, ...pokemonObj });
        }

        console.log(this.pokemonList);
    }

    searchForAttack(moveId) {
        for (let attack of this.attacksList) {
            if (attack.move_id === moveId) {
                return attack;
            }
        }
        return null;
    }

    searchForType(typeName) {
        for (let type of this.typesList) {
            if (type.type_name === typeName) {
                return type;
            }
        }
        return null;
    }

    constructMoveMap(moves) {
        const moveDataMap = {};
        for (let moveData of moves) {
            moveDataMap[moveData.name] = moveData;
        }
        return moveDataMap;
    }


    getPokemonByName(pokemonName) {
        const filteredPokemons = this.pokemonList.filter(pokemon => pokemon.pokemon_name.toLowerCase() === pokemonName.toLowerCase());

        
        return filteredPokemons;
    }



    getPokemonsByType(typeName) {
        return this.pokemonList.filter(pokemon => pokemon.types.some(type => type.type_name.toLowerCase() === typeName.toLowerCase()));
    }

    getPokemonsByAttack(attackName) {
        return this.pokemonList.filter(pokemon => 
            [...pokemon.attacks.fast_moves, ...pokemon.attacks.charged_moves].some(attack => attack.name.toLowerCase() === attackName.toLowerCase())
        );
    }

    getAttacksByType(typeName) {
        const attacks = [];
        this.pokemonList.forEach(pokemon => {
            pokemon.attacks.fast_moves.concat(pokemon.attacks.charged_moves).forEach(attack => {
                if (!attacks.some(a => a.id === attack.id) && pokemon.types.some(type => type.type_name.toLowerCase() === typeName.toLowerCase())) {
                    attacks.push(attack);
                }
            });
        });
        return attacks;
    }

    
    sortPokemonByName() {
        return [...this.pokemonList].sort((a, b) => a.pokemon_name.localeCompare(b.pokemon_name));
    }
    

    
    sortPokemonByStamina() {
        return this.pokemonList.sort((a, b) => b.base_stamina - a.base_stamina);
    }

    
   

    
    

    getWeakestEnemies(attackName) {
        // Chercher l'attaque dans les attaques rapides et chargées pour obtenir son type
        let attackType = fast_moves.find(move => move.name.toLowerCase() === attackName.toLowerCase())?.type
            || charged_moves.find(move => move.name.toLowerCase() === attackName.toLowerCase())?.type;
    
        if (!attackType) {
            console.log("Type d'attaque non trouvé pour :", attackName);
            return [];
        }
    
        // Convertir le tableau type_effectiveness en objet pour faciliter l'accès
        let typeEffectivenessObj = type_effectiveness[0];
    
        return this.pokemonList.filter(pokemon => {
            const effectiveness = pokemon.types.reduce((effect, type) => {
                const eff = typeEffectivenessObj[attackType][type.type_name] || 1; // Utiliser le type d'attaque pour calculer l'efficacité
                return effect * eff;
            }, 1);
            return effectiveness >= 1.6; // Retourner les Pokémon pour lesquels l'attaque est efficace
        });
    }
    
    


    getBestAttackTypesForEnemy(name) {
        const pokemon = this.pokemonList.find(p => p.pokemon_name.toLowerCase() === name.toLowerCase());
        if (!pokemon) return [];
    
        const bestAttackTypes = [];
        // Convertir le tableau type_effectiveness en objet pour faciliter l'accès
        const typeEffectivenessObj = type_effectiveness[0];
    
        Object.keys(typeEffectivenessObj).forEach(attackType => {
            const effectiveness = pokemon.types.reduce((total, type) => {
                const eff = typeEffectivenessObj[attackType][type.type_name] || 1;
                return total * eff;
            }, 1);
            if (effectiveness > 1) bestAttackTypes.push(attackType);
        });
    
        return bestAttackTypes;
    }
    
    
    
    
}
