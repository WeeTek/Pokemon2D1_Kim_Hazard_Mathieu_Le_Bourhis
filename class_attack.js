class Attack {
    constructor(duration, energy_delta, move_id, name, power, stamina_loss_scaler, critical_chance=null) {
        this.duration = duration;
        this.energy_delta = energy_delta;
        this.id = move_id;
        this.name = name;
        this.critical_chance = critical_chance;
        this.power = power;
        this.stamina_loss_scaler = stamina_loss_scaler;
    }
    toString = () => {
        return `${this.id} - ${this.name} - ${this.duration} - ${this.energy_delta} - ${this.power} - ${this.stamina_loss_scaler} - ${this.critical_chance}`;
    }
}
