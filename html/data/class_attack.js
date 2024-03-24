/**
 * Représente une attaque utilisée par un Pokémon.
 */
class Attack {
    /**
     * Crée une instance d'attaque.
     * @param {number} duration - La durée de l'attaque.
     * @param {number} energy_delta - Le changement d'énergie causé par l'attaque.
     * @param {number} move_id - L'identifiant de l'attaque.
     * @param {string} name - Le nom de l'attaque.
     * @param {number} power - La puissance de l'attaque.
     * @param {number} stamina_loss_scaler - L'échelle de perte de stamina de l'attaque.
     * @param {number|null} critical_chance - La chance de coup critique de l'attaque (optionnel).
     */
    constructor(duration, energy_delta, move_id, name, power, stamina_loss_scaler, critical_chance=null) {
        this.duration = duration;
        this.energy_delta = energy_delta;
        this.id = move_id;
        this.name = name;
        this.critical_chance = critical_chance;
        this.power = power;
        this.stamina_loss_scaler = stamina_loss_scaler;
    }

    /**
     * Renvoie une représentation textuelle de l'attaque.
     * @returns {string} - Une chaîne de caractères représentant l'attaque.
     */
    toString = () => {
        // Construction de la représentation textuelle avec des étiquettes pour chaque attribut
        return `ID: ${this.id}, Nom: ${this.name}, Durée: ${this.duration}, Delta d'énergie: ${this.energy_delta}, Puissance: ${this.power}, Échelle de perte de stamina: ${this.stamina_loss_scaler}, Chance de coup critique: ${this.critical_chance || 'Non spécifiée'}`;
    }
}
