// Portfolio Contact Form
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  this.reset();
});

// To-Do List App

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.title = 'Delete task';
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      saveAndRender();
    };

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    todos.push(task);
    todoInput.value = '';
    saveAndRender();
  }
});

// Initial render
saveAndRender();

// Product Listing

const products = [
  { id: 1, name: 'Smartphone', category: 'electronics', price: 699, rating: 4.5 },
  { id: 2, name: 'T-shirt', category: 'clothing', price: 20, rating: 4.2 },
  { id: 3, name: 'Laptop', category: 'electronics', price: 999, rating: 4.8 },
  { id: 4, name: 'Novel Book', category: 'books', price: 15, rating: 4.1 },
  { id: 5, name: 'Jeans', category: 'clothing', price: 40, rating: 4.0 },
  { id: 6, name: 'Headphones', category: 'electronics', price: 120, rating: 4.3 },
  { id: 7, name: 'Cookbook', category: 'books', price: 25, rating: 4.6 }
];

const categorySelect = document.getElementById('category');
const sortSelect = document.getElementById('sort');
const productsContainer = document.getElementById('products-container');

function displayProducts(items) {
  productsContainer.innerHTML = '';
  items.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product-card');

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <p class="product-rating">Rating: ${product.rating.toFixed(1)} ⭐</p>
    `;
    productsContainer.appendChild(div);
  });
}

function filterAndSortProducts() {
  let filtered = [...products];
  const category = categorySelect.value;
  const sort = sortSelect.value;

  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  switch (sort) {
    case 'rating-desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'rating-asc':
      filtered.sort((a, b) => a.rating - b.rating);
      break;
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
  }

  displayProducts(filtered);
}

categorySelect.addEventListener('change', filterAndSortProducts);
sortSelect.addEventListener('change', filterAndSortProducts);

// Initial display
filterAndSortProducts();
