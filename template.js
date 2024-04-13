document.addEventListener('DOMContentLoaded', function () {
    const typeColors = {
        "Bug": "#A8B820",
        "Dark": "#705848",
        "Dragon": "#7038F8",
        "Electric": "#F8D030",
        "Fairy": "#EE99AC",
        "Fighting": "#C03028",
        "Fire": "#FFA040",
        "Flying": "#A890F0",
        "Ghost": "#705898",
        "Grass": "#78C850",
        "Ground": "#E0C068",
        "Ice": "#98D8D8",
        "Normal": "#A8A878",
        "Poison": "#A040A0",
        "Psychic": "#F85888",
        "Rock": "#B8A038",
        "Steel": "#B8B8D0",
        "Water": "#6890F0"
    };

    const fastMovesBtn = document.querySelector('.fast-moves-btn');
    const chargeMovesBtn = document.querySelector('.charge-moves-btn');
    const movesContainer = document.querySelector('.moves-container');
    const statsContainer = document.querySelector('.stats-container');
    let selectedMove = null;
    let startIndex = 0;
    const movesPerPage = 8;
    let type = '';

    function updateTypeColors() {
        document.querySelectorAll('.types p').forEach(typeElement => {
            const type = typeElement.textContent.trim();
            const color = typeColors[type];
            if (color) {
                typeElement.style.background = color;
            }
        });
    }

    function updateMoveTypeBackground() {
        const moveTypeSpan = document.querySelector('.move-type');
        const moveType = moveTypeSpan.textContent.trim();
        const color = typeColors[moveType];
        if (color) {
            moveTypeSpan.style.backgroundColor = color;
            moveTypeSpan.style.borderRadius = '5px';
            moveTypeSpan.style.padding = '5px 10px';
            moveTypeSpan.style.color = '#fff';
        }
    }

    function showMoves(type) {
        const moves = (type === 'fast') ? ['Quick Attack', 'Tackle', 'Dazzling Gleam', 'Vine Whip', 'Ember', 'Water Gun', 'Thunder Shock', 'Scratch', 'Peck', 'Lick', 'Quick Attack', 'Tackle', 'Dazzling Gleam', 'Vine Whip', 'Ember', 'Water Gun', 'Thunder Shock', 'Scratch', 'Peck', 'Lick'] : ['Thunderbolt', 'Flamethrower', 'Hydro Pump', 'Solar Beam', 'Fire Blast', 'Blizzard', 'Earthquake', 'Psychic', 'Shadow Ball', 'Hyper Beam', 'Psychic', 'Shadow Ball', 'Hyper Beam', 'Psychic', 'Shadow Ball', 'Hyper Beam'];
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

        updateTypeColors();
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
            <p class="stats" class="types">Type: <span class="move-type">${stats.type}</span></p>
        `;

        statsContainer.innerHTML = statsHtml;

        updateMoveTypeBackground();
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

    updateTypeColors();
});
