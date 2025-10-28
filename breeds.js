document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById('breed-select');

    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            select.innerHTML = '';

            const breeds = Object.keys(data.message);
            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                select.appendChild(option);
            });
        })
        .catch(error => {
            select.innerHTML = '<option value="">Ошибка загрузки</option>';
            console.error('Ошибка загрузки списка пород:', error);
        });
});