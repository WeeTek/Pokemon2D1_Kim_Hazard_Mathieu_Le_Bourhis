class PokemonController {

    constructor() {
        this.easyAccessGeneration = [];
        this.all_pokemons = [];
        this.all_attacks = [];
        this.all_types = [];
        this.init();
        this.importPokemon();
    }

    init() {
        for (const gen of generation) {
            const pokemons = Object.values(gen)[0];
            for (const pokemon of pokemons) {
                this.easyAccessGeneration.push(pokemon);
            }
        }
    }

    getGenerationForPokemon(pokemonId) {
        for (const pokemon of this.easyAccessGeneration) {
            if (pokemon.id === pokemonId) {
                return pokemon;
            }
        }
        return null;
    }

    createAttack(moves, moveList) {
        for (const move of moves) {
            let attack = null;
            for (const atk of this.all_attacks) {
                if (atk.move_id === move.move_id) {
                    attack = atk;
                    break;
                }
            }
            if (!attack) {
                const newAttack = new Attack(move.duration, move.energy_delta, move.move_id, move.name, move.power, move.stamina_loss_scaler, move.critical_chance);
                this.all_attacks.push({ move_id: newAttack.id, ...newAttack });
                moveList.push(newAttack);
            } else {
                moveList.push(attack);
            }
        }
    }

    importPokemon() {
        for (const poke of pokemon) {
            if (poke.form !== 'Normal') {
                continue;
            }

            const { pokemon_id: id, pokemon_name: name } = poke;
            const generation = this.getGenerationForPokemon(id);

            const pokemonTypes = pokemon_type.find(pokemon => pokemon.pokemon_id === id);
            const types = [];
            for (const typeName of pokemonTypes.type) {
                let typeObject = null;
                for (const type of this.all_types) {
                    if (type.type_name === typeName) {
                        typeObject = type;
                        break;
                    }
                }
                if (!typeObject) {
                    const typeData = type_effectiveness[0][typeName];
                    typeObject = new Types(typeName, typeData);
                    this.all_types.push({ type_name: typeObject.type_name, ...typeObject });
                }
                types.push(typeObject);
            }

            const pokemonAttacks = pokemon_moves.find(pokemon => pokemon.pokemon_id === id && pokemon.pokemon_name === name);

            const chargedMoves = [];
            const eliteFastMoves = [];
            const eliteChargedMoves = [];
            const fastMoves = [];

            this.createAttack(fast_moves.filter(move => pokemonAttacks.fast_moves.includes(move.name)), fastMoves);

            this.createAttack(charged_moves.filter(move => pokemonAttacks.charged_moves.includes(move.name)), chargedMoves);

            this.createAttack(fast_moves.filter(move => pokemonAttacks.elite_fast_moves.includes(move.name)), eliteFastMoves);

            this.createAttack(charged_moves.filter(move => pokemonAttacks.elite_charged_moves.includes(move.name)), eliteChargedMoves);

            const pokemonObject = new Pokemon(id, name, poke.form, poke.base_attack, poke.base_defense, poke.base_stamina, generation, 1, types, chargedMoves, eliteChargedMoves, eliteFastMoves, fastMoves);

            this.all_pokemons.push({ pokemon_id: pokemonObject.pokemon_id, ...pokemonObject });
        }
        console.log(this.all_pokemons);
    }
}
