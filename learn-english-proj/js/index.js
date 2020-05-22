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

// Close SVG
const closeSVG = `<svg width="20px" height="20px" version="1.1" id="Layer_1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve">
   <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
       c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
       c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
       L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
       c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
       c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
       c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/>
</svg>`;
const burgerSVG = `<svg width="20px" height="20px" version="1.1" id="Capa_1" xmlns="https://www.w3.org/2000/svg"
xmlns:xlink="https://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 469.333 469.333"
style="enable-background:new 0 0 469.333 469.333;" xml:space="preserve">
<g>
    <path d="M53.333,106.667H416c29.417,0,53.333-23.927,53.333-53.333S445.417,0,416,0H53.333C23.917,0,0,23.927,0,53.333
S23.917,106.667,53.333,106.667z" />
    <path d="M416,181.333H53.333C23.917,181.333,0,205.26,0,234.667S23.917,288,53.333,288H416c29.417,0,53.333-23.927,53.333-53.333
S445.417,181.333,416,181.333z" />
    <path d="M416,362.667H53.333C23.917,362.667,0,386.594,0,416s23.917,53.333,53.333,53.333H416
c29.417,0,53.333-23.927,53.333-53.333S445.417,362.667,416,362.667z" />
</g>
</svg>`;

// responsive navbar layout
const navSlide = () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinksContainer = document.querySelector('.intro__nav-links');
    const navLinks = document.querySelectorAll('.intro__nav-link');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active-menu');
        navLinksContainer.classList.toggle('active-menu');

        // animating nav links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5}s`;
            }
        });

        // toggle burger menu icon
        if (burgerMenu.className !== 'burger-menu') {
            burgerMenu.innerHTML = closeSVG;
        } else {
            burgerMenu.innerHTML = burgerSVG;
        }
    });
};

navSlide();
