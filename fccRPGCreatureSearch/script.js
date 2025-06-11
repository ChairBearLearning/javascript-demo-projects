const creatures = [
    {name: 'Pyrolynx',id: 1, weight: 42, height: 32, hp: 65, attack: 80, defense: 50, specialAttack: 90, specialDefense: 55,  speed: 100, types: ['fire'] },
    {name: 'Aquoroc',id: 2, weight: 220, height: 53, hp: 85, attack: 90, defense: 120, specialAttack: 60, specialDefense: 75,  speed: 40, types: ['water', 'rock']},
];


document.getElementById('search-button').addEventListener('click', (event) => {
    event.preventDefault();
    const searchValue = document.getElementById('search-input').value.trim().toLowerCase();

    const found = creatures.find(creature =>
        creature.name.toLowerCase() === searchValue ||
        creature.id.toString() === searchValue
    );

    const nameEl = document.getElementById('creature-name');
    const idEl = document.getElementById('creature-id');
    const weightEl = document.getElementById('weight');
    const heightEl = document.getElementById('height');
    const hpEl = document.getElementById('hp');
    const attackEl = document.getElementById('attack');
    const defenseEl = document.getElementById('defense');
    const specialAttackEl = document.getElementById('special-attack');
    const specialDefenseEl = document.getElementById('special-defense');
    const speedEl = document.getElementById('speed');
    const typesEl = document.getElementById('types');

    if (!found) {
        alert('Creature not found');
        return;
    }

    // update creature details
    nameEl.textContent = found.name.toUpperCase();
    idEl.textContent = `#${found.id}`;
    weightEl.textContent = `Weight: ${found.weight}`;
    heightEl.textContent = `Height: ${found.height}`;
    hpEl.textContent = found.hp;
    attackEl.textContent = found.attack;
    defenseEl.textContent = found.defense;
    specialAttackEl.textContent = found.specialAttack;
    specialDefenseEl.textContent = found.specialDefense;
    speedEl.textContent = found.speed;

    // clear and populate types
    typesEl.innerHTML = '';
    found.types.forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.textContent = type.toUpperCase();
        typeElement.classList += type.toLowerCase();
        typesEl.appendChild(typeElement);
    });
});
