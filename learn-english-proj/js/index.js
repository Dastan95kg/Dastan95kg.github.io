const baseURL = `https://dictionary.skyeng.ru/api/public/v1/words/search?search=`;

window.addEventListener('load', () => {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputText = document.querySelector('.vocabulary__input').value.toLowerCase();
        if (inputText.trim() !== '') {
            getTranslation(inputText.trim());
        }
        searchForm.reset();
    });
});

async function getTranslation(text) {
    const mainDiv = document.querySelector('.translation');

    const response = await fetch(`${baseURL}${text}`);
    if (response.status === 200) {
        const data = await response.json();
        const translations = data[0].meanings.map(item => item.translation.text); // array of translation words

        // checking if the API contains input text
        if (text === data[0].text.toLowerCase()) {
            const title = mainDiv.querySelector('h2');
            title.style.display = 'block';

            const wrapper = document.createElement('div');
            wrapper.className = 'translation__wrapper';
            mainDiv.append(wrapper);

            const left = document.createElement('div');
            left.className = 'translation__word';
            left.innerText = text;
            wrapper.append(left);

            const resultWrapper = document.createElement('div');
            resultWrapper.className = 'translation__result-wrapper';
            wrapper.append(resultWrapper);

            const ul = document.createElement('ul');
            ul.className = 'translation__result';
            resultWrapper.append(ul);

            translations.forEach(item => {
                const li = document.createElement('li');
                li.innerText = item;
                ul.appendChild(li);
            });

            // add audio transcription
            const soundUrl = data[0].meanings[0].soundUrl;
            const audio = document.createElement('audio');
            audio.setAttribute('src', soundUrl);
            audio.setAttribute("controls", "controls");
            audio.setAttribute("autoplay", "autoplay");
            resultWrapper.appendChild(audio);

            // add image
            const imageUrl = data[0].meanings[0].imageUrl;
            const image = document.createElement('img');
            image.setAttribute('class', 'translation__image');
            image.setAttribute('src', imageUrl);
            resultWrapper.appendChild(image);
        } else {
            alert(`There is no word: ${text}`);
        }
    } else {
        alert('Error');
    }
}

function reloadPage() {
    location.reload();
    result.removeChild();
    label.removeChild();
}