class Pokemon {
    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina, generation, cp_multiplier, types, charged_moves, elite_charged_moves, elite_fast_moves, fast_moves) {
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
        this.generation = generation;
        this.cp_multiplier = cp_multiplier;
        this.types = types;
        this.attacks = {
            fast_moves,
            charged_moves,
            elite_fast_moves,
            elite_charged_moves
        }
    }
    toString() {
        return `${this.pokemon_id} - ${this.pokemon_name} - ${this.base_attack} - ${this.base_defense} - ${this.base_stamina} - ${this.generation} - ${this.cp_multiplier} - ${this.types} - ${this.attacks}`;
    }
    getTypes = () => {
        return this.types;
    }
    getAttacks = () => {
        return this.attacks;
    }
}
