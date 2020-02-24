const addButton = document.querySelector('.addButton');
var input = document.querySelector('.input');
const container = document.querySelector('.container');

class Item {
    constructor(itemName) {
        // Create the item div
        this.createDiv(itemName);
    }

    createDiv(itemName) {
        let input = document.createElement('input');
        input.value = itemName;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = 'text';

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'item_checkbox';

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        let editButton = document.createElement('button');
        editButton.innerHTML = "Оңдоо";
        editButton.classList.add('editButton');

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "Өчүрүү";
        removeButton.classList.add('removeButton');

        container.appendChild(itemBox);

        itemBox.appendChild(checkbox);
        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);

        checkbox.addEventListener( 'click', () => this.finish(itemBox) );

        editButton.addEventListener( 'click', () => this.edit(input) );

        removeButton.addEventListener( 'click', () => this.remove(itemBox) );
    }

    finish(item) {
        let checkbox = item.querySelector('#item_checkbox');
        let item_input = item.querySelector('.item_input');

        (checkbox.checked) ? item_input.style.textDecoration = 'line-through':
        item_input.style.textDecoration = 'none';
    }

    edit(input) {
        input.disabled = !input.disabled;
    }

    remove(item) {
        container.removeChild(item);
    }
}

function check() {
    if (input.value.trim() !== "") {
        new Item(input.value.trim());
        input.value = "";
    }
}

addButton.addEventListener('click', check);
window.addEventListener( 'keydown', event => {
    if (event.which == 13) {
        check();
    }
});