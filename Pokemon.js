class Pokemon {

    /* Constructeur de l'Objet Pokemon
    Prends en paramètres:
    -id
    -nom
    -attaque
    -defense
    -endurance
    -generation
    -coeff
    -type
    -les différentes attaques
    */ 
    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina, generation, cp_multiplier, types, charged_moves, elite_charged_moves, elite_fast_moves, fast_moves) {
        this.pokemon_id = pokemon_id; //id du Pokemon Unique
        this.pokemon_name = pokemon_name; //nom du Pokémon
        this.base_attack = base_attack; //points d'attaque du Pokémon
        this.base_defense = base_defense; //points de defence du Pokémon
        this.base_stamina = base_stamina; // Point d'endurance/énergie du Pokémon
        this.generation = generation; //génération du Pokemon
        this.cp_multiplier = cp_multiplier;
        this.types = types; //stockages du/des type(s) d'un pokémon
        this.attacks = { /* stockage des différents types de mouvement d'un pokémon */
            fast_moves, //stockage des attaques 'rapide(s)' d'un pokémon
            charged_moves, //stockage des attaques 'lourde(s)/chargé(s)' d'un pokémon
            elite_fast_moves, //stockage des attaques 'rapide(s) Elite d'un Pokemon
            elite_charged_moves // stockage des attaques 'Lourdes/Chargés Elite d'un Pokémon
        }
    }

    
 /* fonction 'ToString' renvoyant les différentes informations d'un pokémon sous forme d'une ligne de texte*/
    toString(){
        print("ID Pokemon: ", this.pokemon_id); //affiche l'ID unique d'un pokémon
        print("Nom Pokemon: ", this.pokemon_name);//affiche le nom d'un pokémon
        print("Attaque: ", this.attack); //affiche l'attaque d'un pokémon
        print("Defense: ", this.defense); //affiche la defense d'un pokémon
        print("Energie: ", this.stamina); //affiche les points d'énergie/endurance du pokémon
        print("Generation: ", this.generation); //affiche la génération associé au pokémon
        print("Coeff: ", this.cp_multiplier); //affiche les coeff associé à un pokémon
        print("Type(s):", this.types);  //affiche le/les types associé(s) à un pokémon
        print("Attaque:", this.attacks); //affiche les attaques associés à un pokémon
    }

    /* fonction 'geTypes' permettant de retourner le/les types associé(s) à un pokémon*/ 
    getTypes = () => {
        return this.types;
    }

    /* fonction 'getAttacks' permettant de retourner l'ensembles des attacks associés à un pokémon */
    getAttacks = () => {
        return this.attacks; 
    }
}
