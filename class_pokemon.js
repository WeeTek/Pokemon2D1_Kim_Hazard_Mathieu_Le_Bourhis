class Pokemon{
    constructor(pokemon_id,attack,defense,stamina,form,pokemon_name){
        if(form.localeCompare("Normal")!= 0){
            print("Les Pokémon ne peuvent qu'être de type: Normal")
        }
        else{
            this.pokemon_id = pokemon_id;
            this.attack = attack;
            this.defense = defense;
            this.stamina = stamina;
            this.pokemon_name = pokemon_name;
            this.type = type;
        }
    }
    toString(){
        print("ID Pokemon:", pokemon_id);
        print("Nom Pokemon:", pokemon_name);
        print("Attaque:", attack);
        print("Defense:", defense);
        print("Energie:", stamina);
    }

    import_pokemon(){
        
    }
}
