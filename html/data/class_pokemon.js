/**
 * Représente un Pokémon avec ses attributs de base, ses types et ses attaques.
 */
class Pokemon {
    /**
     * Crée une instance de Pokémon.
     * @param {number} pokemon_id - L'identifiant du Pokémon.
     * @param {string} pokemon_name - Le nom du Pokémon.
     * @param {string} form - La forme du Pokémon.
     * @param {number} base_attack - La statistique d'attaque de base du Pokémon.
     * @param {number} base_defense - La statistique de défense de base du Pokémon.
     * @param {number} base_stamina - La statistique de stamina de base du Pokémon.
     * @param {Object} generation - Les données de génération du Pokémon.
     * @param {number} cp_multiplier - Le multiplicateur de CP du Pokémon.
     * @param {Types[]} types - Les types du Pokémon.
     * @param {Attack[]} charged_moves - Les attaques chargées du Pokémon.
     * @param {Attack[]} elite_charged_moves - Les attaques chargées élites du Pokémon.
     * @param {Attack[]} elite_fast_moves - Les attaques rapides élites du Pokémon.
     * @param {Attack[]} fast_moves - Les attaques rapides du Pokémon.
     */
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

    /**
     * Renvoie une représentation textuelle du Pokémon.
     * @returns {string} - Une chaîne de caractères représentant le Pokémon.
     */
    toString() {
        return `${this.pokemon_id} - ${this.pokemon_name} - ${this.base_attack} - ${this.base_defense} - ${this.base_stamina} - ${this.generation} - ${this.cp_multiplier} - ${this.types} - ${this.attacks}`;
    }

    /**
     * Récupère les types du Pokémon.
     * @returns {Types[]} - Les types du Pokémon.
     */
    getTypes = () => {
        return this.types;
    }

    /**
     * Récupère les attaques du Pokémon.
     * @returns {Object} - Les attaques du Pokémon.
     */
    getAttacks = () => {
        return this.attacks;
    }
}
