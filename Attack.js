class Attack {

    /* Constructeur de l'Objet Attack
    Prends en paramètres:
    -durée
    -énergie consommé
    -id du mouvement
    -nom du mouvement
    -puissance
    -endurance perdu
    -chance critique
    -endurance perdu
    */ 
    constructor(duration, energy_delta, move_id, name, power, stamina_loss_scaler, critical_chance=null) {
        this.duration = duration; //durée de l'action
        this.energy_delta = energy_delta; //énergie consommé
        this.id = move_id; // id de l'attaque
        this.name = name; //nom de 
        this.critical_chance = critical_chance; //chance de coup critique
        this.power = power; //puissance de l'attaque
        this.stamina_loss_scaler = stamina_loss_scaler; //endurance perdu
    }
    toString = () => {
        print("Durée de l'action : ", this.duration);
        print("Nom de l'action: ", this.name); 
        print("Nom Pokemon: ", this.critical_chance);
        print("Attaque: ", this.power); 
        print("Defense: ", this.move_id); 
        print("Energie: ", this.energy_delta);
        print("Generation: ", this.stamina_loss_scaler);
    }
}
