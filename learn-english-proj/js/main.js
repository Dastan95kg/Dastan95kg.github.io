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

const navSlide = () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const menu = document.querySelector('.nav__logo-right');
    const menuLinks = document.querySelectorAll('.nav__link');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active-menu');
        menu.classList.toggle('active-menu');

        menuLinks.forEach((link, index) => {
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