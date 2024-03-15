class Types {
    /* Constructeur de l'Objet Types*/ 
    constructor(type_name, type_data) {
        this.type_name = type_name;
        this.type_data = {
            Bug : type_data.Bug,
            Dark : type_data.Dark,
            Dragon : type_data.Dragon,
            Electric : type_data.Electric,
            Fairy : type_data.Fairy,
            Fighting : type_data.Fighting,
            Fire : type_data.Fire,
            Flying : type_data.Flying,
            Ghost : type_data.Ghost,
            Grass : type_data.Grass,
            Ground : type_data.Ground,
            Ice : type_data.Ice,
            Normal : type_data.Normal,
            Poison : type_data.Poison,
            Psychic : type_data.Psychic,
            Rock : type_data.Rock,
            Steel : type_data.Steel,
            Water : type_data.Water
        };
    }

     /* fonction 'ToString' renvoyant les différentes informations d'un Types sous forme d'une ligne de texte*/

    toString() {
        print("Nom du type: ", this.type_name);//affiche le nom du Type
        print("Donnée associés au type", this.type_data);//affiche les données associés au types
        
    }
}
