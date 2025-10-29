document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById('breed-select');
    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.textContent = 'Refresh';
    select.after(refreshBtn);

    function showError(message) {
        select.innerHTML = '';
        const option = document.createElement('option');
        option.value = '';
        option.textContent = message;
        select.appendChild(option);
    }

    function populateBreeds(breeds, selectedBreed) {
        select.innerHTML = '';
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            if (breed === selectedBreed) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    }

    function loadBreeds(selectedBreed = '') {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const breeds = Object.keys(data.message);
                populateBreeds(breeds, selectedBreed);
            })
            .catch(error => {
                showError('Ошибка загрузки');
                console.error('Ошибка загрузки списка пород:', error);
            });
    }

    loadBreeds();

    refreshBtn.addEventListener('click', () => {
        const currentSelection = select.value;
        loadBreeds(currentSelection);
    });
});
