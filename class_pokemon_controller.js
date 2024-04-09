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
        console.log(pokeId);
        console.log(flatGenerationList)
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
}
