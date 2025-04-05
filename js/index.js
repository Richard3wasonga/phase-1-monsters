document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container');
    const createMonsterDiv = document.getElementById('create-monster');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');

    let currentPage = 1;

    

    const fetchMonsters = async (page = 1, limit = 50) => {
        const response = await fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`);
        return await response.json();
    };

    
    const renderMonsters = (monsters) => {
        monsters.forEach(monster => {
            const monsterDiv = document.createElement('div');
            monsterDiv.innerHTML = `
                <h2>${monster.name}</h2>
                <p>Age: ${monster.age}</p>
                <p>Descritpion: ${monster.description}</p>
            `;

            monsterContainer.appendChild(monsterDiv);
        });
    };

    
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const age = parseFloat(event.target.age.value);
        const description = event.target.description.value;

        

        const newMonster = {
            name,
            age,
            description
        };

        

        await fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(newMonster)
        });

        
        event.target.reset();

        
        monsterContainer.innerHTML = '';
        fetchAndRenderMonsters(currentPage);
    };

    
    const fetchAndRenderMonsters = async (page) => {
        const monsters = await fetchMonsters(page);
        renderMonsters(monsters);
    };

    
    createMonsterDiv.innerHTML = `
        <form id="monster-form">
            <input type="text" id="name" placeholder="Name">
            <input type="number" id="age" placeholder="Age">
            <input type="text" id="description" placeholder="Description">
            <button type="submit"> Create Monster </button>
        </form>
    `;

    const createMonsterForm = document.getElementById('monster-form');
    createMonsterForm.addEventListener('submit', handleFormSubmit);


    forwardButton.addEventListener('click', () => {
        currentPage++;
        fetchAndRenderMonsters(currentPage);
    });

    
    backButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchAndRenderMonsters(currentPage);
        }
    });

    
    fetchMonsters();
});