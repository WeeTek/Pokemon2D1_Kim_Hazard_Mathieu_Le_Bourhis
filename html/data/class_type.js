/**
 * Représente les types d'un Pokémon avec leurs données associées.
 */
class Types {
    /**
     * Crée une instance de types avec leurs données.
     * @param {string} type_name - Le nom du type.
     * @param {Object} type_data - Les données du type.
     */
    constructor(type_name, type_data) {
        this.type_name = type_name;
        this.type_data = {
            Bug: type_data.Bug,
            Dark: type_data.Dark,
            Dragon: type_data.Dragon,
            Electric: type_data.Electric,
            Fairy: type_data.Fairy,
            Fighting: type_data.Fighting,
            Fire: type_data.Fire,
            Flying: type_data.Flying,
            Ghost: type_data.Ghost,
            Grass: type_data.Grass,
            Ground: type_data.Ground,
            Ice: type_data.Ice,
            Normal: type_data.Normal,
            Poison: type_data.Poison,
            Psychic: type_data.Psychic,
            Rock: type_data.Rock,
            Steel: type_data.Steel,
            Water: type_data.Water
        };
    }

    /**
     * Renvoie une représentation textuelle des types.
     * @returns {string} - Une chaîne de caractères représentant les types et leurs données associées.
     */
    toString() {
        return `Type: ${this.type_name}\nDonnée du type ${this.type_data}`;
    }
}
