document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById('breed-select');
    const refreshBtn = document.getElementById('refresh-btn');
    const imagesContainer = document.getElementById('images-container');

    let currentBreed = '';
    let currentImages = [];

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

    function renderImages(images) {
        imagesContainer.innerHTML = '';
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.style.width = '150px';
            img.style.margin = '5px';
            imagesContainer.appendChild(img);
        });
    }

    function fetchImagesForBreed(breed) {
        let url;
        if (!breed) {
            url = 'https://dog.ceo/api/breeds/image/random/3';
        } else {
            url = `https://dog.ceo/api/breed/${breed}/images/random/3`;
        }

        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                return Array.isArray(data.message) ? data.message : [data.message];
            })
            .catch(error => {
                console.error('Ошибка загрузки изображений:', error);
                return [];
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
                if (selectedBreed) {
                    select.value = selectedBreed;
                }
                if (currentBreed !== selectedBreed || !currentBreed) {
                    currentBreed = selectedBreed;
                    fetchImagesForBreed(currentBreed).then(images => {
                        currentImages = images;
                        renderImages(currentImages);
                    });
                } else {
                    renderImages(currentImages);
                }
            })
            .catch(error => {
                showError('Ошибка загрузки');
                console.error('Ошибка загрузки списка пород:', error);
            });
    }

    select.addEventListener('change', () => {
        const selected = select.value;
        if (selected !== currentBreed) {
            currentBreed = selected;
            fetchImagesForBreed(currentBreed).then(images => {
                currentImages = images;
                renderImages(currentImages);
            });
        }
    });

    refreshBtn.addEventListener('click', () => {
        loadBreeds(select.value);
    });

    loadBreeds();
});