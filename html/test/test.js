document.addEventListener("DOMContentLoaded", () => {
    const pokemonController = new PokemonController();
    // Test Q1: Obtenir les Pokémon par type
    document.getElementById("testPokemonsByType").addEventListener("click", function() {
        const type = document.getElementById("inputValue").value;
        const result = pokemonController.getPokemonsByType(type);
        console.table(result);
    });

    // Test Q2: Obtenir les Pokémon par attaque
    document.getElementById("testPokemonsByAttack").addEventListener("click", function() {
        const attack = document.getElementById("inputValue").value;
        const result = pokemonController.getPokemonsByAttack(attack);
        console.table(result);
    });

    // Test Q3: Obtenir les attaques par type
    document.getElementById("testAttacksByType").addEventListener("click", function() {
        const type = document.getElementById("inputValue").value;
        const result = pokemonController.getAttacksByType(type);
        console.table(result);
    });

    // Test Q4: Trier les Pokémon par nom
    document.getElementById("testSortPokemonByName").addEventListener("click", function() {
        const result = pokemonController.sortPokemonByName();
        console.table(result);
    });

    // Test Q5: Trier les Pokémon par endurance
    document.getElementById("testSortPokemonByStamina").addEventListener("click", function() {
        const result = pokemonController.sortPokemonByStamina();
        console.table(result);
    });

    // Test Q6: Obtenir les ennemis les plus faibles
    document.getElementById("testWeakestEnemies").addEventListener("click", function() {
        const attack = document.getElementById("inputValue").value;
        const result = pokemonController.getWeakestEnemies(attack);
        console.table(result);
    });

    // Test Q7: Meilleurs types d'attaque contre un Pokémon
    document.getElementById("testBestAttackTypesForEnemy").addEventListener("click", function() {
        const name = document.getElementById("inputValue").value;
        const result = pokemonController.getBestAttackTypesForEnemy(name);
        console.log("Meilleurs types d'attaque contre", name, ":", result.join(', '));
    });
});
