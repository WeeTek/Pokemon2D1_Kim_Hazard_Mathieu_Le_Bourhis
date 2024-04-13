document.addEventListener('DOMContentLoaded', function () {
    const fastMovesBtn = document.querySelector('.fast-moves-btn');
    const chargeMovesBtn = document.querySelector('.charge-moves-btn');
    const movesContainer = document.querySelector('.moves-container');
    const statsContainer = document.querySelector('.stats-container');
    let selectedMove = null;
    let startIndex = 0;
    const movesPerPage = 8;
    let type = '';

    function showMoves(type) {
        let moves = [];

        if (type === 'fast') {
            moves = ['Quick Attack', 'Tackle', 'Dazzling Gleam', 'Vine Whip', 'Ember', 'Water Gun', 'Thunder Shock', 'Scratch', 'Peck', 'Lick', 'Quick Attack', 'Tackle', 'Dazzling Gleam', 'Vine Whip', 'Ember', 'Water Gun', 'Thunder Shock', 'Scratch', 'Peck', 'Lick'];
        } else if (type === 'charge') {
            moves = ['Thunderbolt', 'Flamethrower', 'Hydro Pump', 'Solar Beam', 'Fire Blast', 'Blizzard', 'Earthquake', 'Psychic', 'Shadow Ball', 'Hyper Beam', 'Psychic', 'Shadow Ball', 'Hyper Beam', 'Psychic', 'Shadow Ball', 'Hyper Beam'];
        }

        const endIndex = Math.min(startIndex + movesPerPage, moves.length);

        const htmlList = '<ul>' + moves.slice(startIndex, endIndex).map(move => '<li class="move">' + move + '</li>').join('') + '</ul>';
        movesContainer.innerHTML = htmlList;
        movesContainer.style.display = 'block';

        const nextBtn = '<button class="next-btn">' + (endIndex < moves.length ? '>' : '-') + '</button>';
        const prevBtn = '<button class="prev-btn">' + (startIndex > 0 ? '<' : '-') + '</button>';
        const pagination = '<div class="pagination">' + prevBtn + nextBtn + '</div>';
        document.querySelector('.pagination-container').innerHTML = pagination;

        addMoveEventListeners();
        addPaginationEventListeners();
    }

    function addMoveEventListeners() {
        document.querySelectorAll('.move').forEach(moveElement => {
            moveElement.addEventListener('click', function () {
                if (selectedMove) {
                    selectedMove.classList.remove('selected');
                }
                selectedMove = moveElement;
                moveElement.classList.add('selected');
                showStats(moveElement.textContent);
            });
        });
    }

    function addPaginationEventListeners() {
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');

        nextBtn.addEventListener('click', function () {
            if (nextBtn.textContent !== '-') {
                startIndex += movesPerPage;
                showMoves(type);
            }
            removeFocus(nextBtn);
        });

        prevBtn.addEventListener('click', function () {
            startIndex = Math.max(startIndex - movesPerPage, 0);
            showMoves(type);
            removeFocus(prevBtn);
        });
    }

    function removeFocus(element) {
        element.blur();
    }

    function showStats(move) {
        const stats = {
            critical_chance: 0.05,
            duration: 2900,
            energy_delta: -33,
            move_id: 13,
            power: 60,
            stamina_loss_scaler: 0.06,
            type: 'Normal'
        };
    
        const statsHtml = `
            <h3>Stats:</h3>
            <p class="stats">Critical Chance: ${stats.critical_chance}</p>
            <p class="stats">Duration: ${stats.duration}</p>
            <p class="stats">Energy Delta: ${stats.energy_delta}</p>
            <p class="stats">Power: ${stats.power}</p>
            <p class="stats">Stamina Loss Scaler: ${stats.stamina_loss_scaler}</p>
            <p class="stats" class"types">Type: <span style="color: white; background-color: #476CCC; border-radius: 5px; padding: 5px 10px;">${stats.type}</span></p>
        `;
    
        statsContainer.innerHTML = statsHtml;
    }
    

    fastMovesBtn.addEventListener('click', function () {
        type = 'fast';
        startIndex = 0;
        showMoves(type);
        fastMovesBtn.classList.add('active');
        chargeMovesBtn.classList.remove('active');
    });

    chargeMovesBtn.addEventListener('click', function () {
        type = 'charge';
        startIndex = 0;
        showMoves(type);
        chargeMovesBtn.classList.add('active');
        fastMovesBtn.classList.remove('active');
    });

});