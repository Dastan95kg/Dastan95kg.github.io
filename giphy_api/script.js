let api_key = 'SHeftHLJ5WErqoerFzUsHVYmoHjGZq9E';
document.addEventListener('DOMContentLoaded', start);

function start() {
    document.getElementById('btnSearch').addEventListener('click', event => {
        event.preventDefault();
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&limit=21&q=`;
        let query = document.getElementById('input').value.trim();
        url = url.concat(query);
        
        fetch(url)
            .then(response => response.json())
            .then(data => loadImages(data))
            .catch(err => console.error(err));
    });
}

function loadImages(obj) {
    let output = document.querySelector('.out');

    // Getting images from JSON and displaying on the page
    for (let i = 0; i < obj.data.length; i++) {
        let img = document.createElement('img');
        img.className = 'img';
        img.src = obj.data[i].images.downsized.url;
        
        let imgWrapper = document.createElement('div');
        imgWrapper.className = 'img-wrap';
        
        output.appendChild(imgWrapper);
        imgWrapper.appendChild(img);
        document.querySelector('#input').value = '';
    }

    // Clearing images
    document.getElementById('btnClear').addEventListener('click', () => {
        document.body.removeChild(output);
    });
}