document.addEventListener('DOMContentLoaded', function() {
    const addItemButton = document.getElementById('addItem');
    const clearListButton = document.getElementById('clearList');
    const itemList = document.getElementById('list');
    const itemInput = document.getElementById('item');
    let shoppingList = [];

    // Check if there's existing data in local storage and load it
    if (localStorage.getItem('shoppingList')) {
        shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
        renderList();
    }

    // Event listener for adding an item
    addItemButton.addEventListener('click', function() {
        const newItem = itemInput.value.trim();
        if (newItem !== '') {
            shoppingList.push({ name: newItem, purchased: false });
            saveToLocalStorage();
            renderList();
            itemInput.value = '';
        }
    });

    // Event listener for marking an item as purchased or editing an item
    itemList.addEventListener('click', function(event) {
        if (event.target.classList.contains('mark-btn')) {
            const index = event.target.parentElement.dataset.index;
            shoppingList[index].purchased = !shoppingList[index].purchased;
            saveToLocalStorage();
            renderList();
        } else if (event.target.classList.contains('edit-btn')) {
            const index = event.target.parentElement.dataset.index;
            const newName = prompt('Edit item:', shoppingList[index].name);
            if (newName !== null) {
                shoppingList[index].name = newName.trim();
                saveToLocalStorage();
                renderList();
            }
        }
    });

    // Event listener for clearing the entire list
    clearListButton.addEventListener('click', function() {
        shoppingList = [];
        saveToLocalStorage();
        renderList();
    });

    // Function to save shopping list to local storage
    function saveToLocalStorage() {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }

    // Function to render the shopping list
    function renderList() {
        itemList.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.dataset.index = index;
            if (item.purchased) {
                li.classList.add('completed');
            }

            const markButton = document.createElement('button');
            markButton.textContent = item.purchased ? 'Unmark' : 'Mark Purchased';
            markButton.classList.add('mark-btn');
            li.appendChild(markButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            li.appendChild(editButton);

            itemList.appendChild(li);
        });
    }
});
