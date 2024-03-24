/**
 * Le contrôleur Pokémon gère les données des Pokémon, des attaques et des types.
 */
class PokemonController {
    constructor() {
        // Liste des générations de Pokémon
        this.generationList = [];
        // Liste des Pokémon
        this.pokemonList = [];
        // Liste des attaques
        this.attacksList = [];
        // Liste des types
        this.typesList = [];
        // Initialisation des données
        this.initialize();
        // Importation des données des Pokémon
        this.importPokemonData();
    }

    /**
     * Initialise les données des générations de Pokémon.
     */
    initialize() {
        for (let genData of generation) {
            const genValues = Object.values(genData);
            this.generationList.push(...genValues);
        }
    }

    /**
     * Trouve la génération d'un Pokémon basé sur son identifiant.
     * @param {number} pokeId - L'identifiant du Pokémon.
     * @returns {Object|null} - Les données de la génération du Pokémon, ou null si non trouvé.
     */
    findGenerationForPokemon(pokeId) {
        const flatGenerationList = this.generationList.flat();
        const generation = flatGenerationList.find(gen => gen.id === pokeId);
        return generation || null;
    }

    /**
     * Traite la liste des attaques d'un Pokémon.
     * @param {string[]} moves - Liste des noms des attaques.
     * @param {Object} movesMap - Map associant les noms d'attaques à leurs données.
     * @returns {Attack[]} - Liste des attaques traitées.
     */
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

    /**
     * Importe les données des Pokémon, y compris les types et les attaques.
     */
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

    /**
     * Recherche une attaque dans la liste des attaques.
     * @param {number} moveId - L'identifiant de l'attaque.
     * @returns {Attack|null} - L'attaque trouvée, ou null si non trouvée.
     */
    searchForAttack(moveId) {
        for (let attack of this.attacksList) {
            if (attack.move_id === moveId) {
                return attack;
            }
        }
        return null;
    }

    /**
     * Recherche un type dans la liste des types.
     * @param {string} typeName - Le nom du type.
     * @returns {Types|null} - Le type trouvé, ou null si non trouvé.
     */
    searchForType(typeName) {
        for (let type of this.typesList) {
            if (type.type_name === typeName) {
                return type;
            }
        }
        return null;
    }

    /**
     * Construit une carte associant les noms d'attaques à leurs données.
     * @param {Object[]} moves - Liste des données d'attaques.
     * @returns {Object} - Map associant les noms d'attaques à leurs données.
     */
    constructMoveMap(moves) {
        const moveDataMap = {};
        for (let moveData of moves) {
            moveDataMap[moveData.name] = moveData;
        }
        return moveDataMap;
    }

    /**
     * Récupère les Pokémon avec un nom spécifique.
     * @param {string} pokemonName - Le nom du Pokémon à rechercher.
     * @returns {Object[]} - Liste des Pokémon trouvés.
     */
    getPokemonByName(pokemonName) {
        const filteredPokemons = this.pokemonList.filter(pokemon => pokemon.pokemon_name.toLowerCase() === pokemonName.toLowerCase());
        return filteredPokemons;
    }

    /**
     * Récupère les Pokémon ayant un type spécifique.
     * @param {string} typeName - Le nom du type à rechercher.
     * @returns {Object[]} - Liste
     * des Pokémon trouvés.
     */
    getPokemonsByType(typeName) {
        return this.pokemonList.filter(pokemon => pokemon.types.some(type => type.type_name.toLowerCase() === typeName.toLowerCase()));
    }

    /**
     * Récupère les Pokémon ayant une attaque spécifique.
     * @param {string} attackName - Le nom de l'attaque à rechercher.
     * @returns {Object[]} - Liste des Pokémon trouvés.
     */
    getPokemonsByAttack(attackName) {
        return this.pokemonList.filter(pokemon => 
            [...pokemon.attacks.fast_moves, ...pokemon.attacks.charged_moves].some(attack => attack.name.toLowerCase() === attackName.toLowerCase())
        );
    }

    /**
     * Récupère les attaques d'un type spécifique utilisées par les Pokémon.
     * @param {string} typeName - Le nom du type à rechercher.
     * @returns {Attack[]} - Liste des attaques trouvées.
     */
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

    /**
     * Trie les Pokémon par nom.
     * @returns {Object[]} - Liste des Pokémon triés.
     */
    sortPokemonByName() {
        return [...this.pokemonList].sort((a, b) => a.pokemon_name.localeCompare(b.pokemon_name));
    }

    /**
     * Trie les Pokémon par statistique de stamina.
     * @returns {Object[]} - Liste des Pokémon triés.
     */
    sortPokemonByStamina() {
        return this.pokemonList.sort((a, b) => b.base_stamina - a.base_stamina);
    }

    /**
     * Récupère les ennemis les plus faibles pour une attaque spécifique.
     * @param {string} attackName - Le nom de l'attaque.
     * @returns {Object[]} - Liste des Pokémon considérés comme les plus faibles contre cette attaque.
     */
    getWeakestEnemies(attackName) {
        let attackType = fast_moves.find(move => move.name.toLowerCase() === attackName.toLowerCase())?.type
            || charged_moves.find(move => move.name.toLowerCase() === attackName.toLowerCase())?.type;
    
        if (!attackType) {
            console.log("Type d'attaque non trouvé pour :", attackName);
            return []; 
        }
        const typeEffectivenessObj = type_effectiveness[0];
    
        return this.pokemonList.filter(pokemon => {
            const effectiveness = pokemon.types.reduce((totalEffectiveness, type) => {
                const typeEffectiveness = typeEffectivenessObj[attackType][type.type_name] || 1; 
                return totalEffectiveness * typeEffectiveness; 
            }, 1);
    
            return effectiveness >= 1.60;
        });
    }
    

    /**
     * Récupère les types d'attaques les plus efficaces contre un Pokémon donné.
     * @param {string} name - Le nom du Pokémon.
     * @returns {string[]} - Liste des types d'attaques les plus efficaces contre ce Pokémon.
     */
    getBestAttackTypesForEnemy(name) {
        const pokemon = this.pokemonList.find(p => p.pokemon_name.toLowerCase() === name.toLowerCase());
        if (!pokemon) return [];
    
        const bestAttackTypes = [];
        
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
