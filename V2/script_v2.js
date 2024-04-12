function sortTable(columnIndex) {
  let table = document.getElementById("pokemon-table");
  let rows = Array.from(table.rows).slice(1); // Ignorer l'en-tête

  rows.sort((a, b) => {
    let cellA = a.cells[columnIndex].innerText;
    let cellB = b.cells[columnIndex].innerText;

    // Comparaison des cellules en fonction de leur type (nombre ou chaîne)
    return isNaN(parseFloat(cellA)) ?
      cellA.localeCompare(cellB) :
      parseFloat(cellA) - parseFloat(cellB);
  });

  // Inverser l'ordre de tri si la colonne est cliquée à nouveau
  if (table.getAttribute("data-sorted") === columnIndex.toString()) {
    rows.reverse();
  }

  // Mettre à jour l'attribut "data-sorted" et reconstruire le corps du tableau
  table.setAttribute("data-sorted", columnIndex);
  table.tBodies[0].append(...rows);
}

document.addEventListener('DOMContentLoaded', () => {
    const pokemonController = new PokemonController();
  

    const pokemonData = pokemonController.pokemonList;
  
    const pokemonTableBody = document.querySelector('#pokemon-table-body');

   
    
  

    pokemonData.forEach(pokemon => {
      const pokemonRow = document.createElement('tr');
  
      
      const idCell = document.createElement('td');
      idCell.textContent = pokemon.pokemon_id;
      pokemonRow.appendChild(idCell);
  
      const nameCell = document.createElement('td');
      nameCell.textContent = pokemon.pokemon_name;
      pokemonRow.appendChild(nameCell);
  
      const genCell = document.createElement('td');
      genCell.textContent = pokemon.generation.generation_number;
      pokemonRow.appendChild(genCell);
  
      const attackCell = document.createElement('td');
      attackCell.textContent = pokemon.base_attack;
      pokemonRow.appendChild(attackCell);
  
      const defenseCell = document.createElement('td');
      defenseCell.textContent = pokemon.base_defense;
      pokemonRow.appendChild(defenseCell);
  
      const typesCell = document.createElement('td');
      typesCell.textContent = pokemon.types.map(type => type.type_name).join(', ');
      pokemonRow.appendChild(typesCell);
  
      const imageCell = document.createElement('td');
      const image = document.createElement('img');
        

      let imgSrcbuffer;
        
      if (pokemon.pokemon_id < 10) {
        
        imgSrcbuffer = '00' + String(pokemon.pokemon_id);
      } else if (pokemon.pokemon_id < 100) {
        imgSrcbuffer = '0' + String(pokemon.pokemon_id);
        
        
      }else{

        imgSrcbuffer = String(pokemon.pokemon_id);
        console.log(imgSrcbuffer);
      }
        
      

      if (pokemon.pokemon_id <= 809) {
        image.src = `../data/webp/sprites/${imgSrcbuffer}MS.webp`;
      }else{
        image.src = `../data/webp/sprites/${imgSrcbuffer}.webp`;

      }
      imageCell.appendChild(image);
      pokemonRow.appendChild(imageCell);
  
      // Ajouter la nouvelle ligne au corps du tableau
      pokemonTableBody.appendChild(pokemonRow);
    });
  });
  
