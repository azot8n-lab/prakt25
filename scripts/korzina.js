// Получаем необходимые элементы
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');

// Массив для хранения товаров в корзине
let cart = [];

// Функция для добавления товара
function addToCart(product) {
 const existingProduct = cart.find(item => item.name === product.name);
 
 if (existingProduct) {
 existingProduct.quantity++;
 } else {
 cart.push({
 name: product.name,
 price: product.price,
 image: product.image,
 quantity: 1
 });
 }
 
 updateCartUI();
}

// Функция для обновления интерфейса корзины
function updateCartUI() {
 cartItemsContainer.innerHTML = '';
 let totalPrice = 0;
 
 cart.forEach(item => {
 const itemElement = document.createElement('div');
 itemElement.classList.add('cart-item');
 
 itemElement.innerHTML = `
 <img src="${item.image}" alt="${item.name}">
 <div class="product-info">
 ${item.name} - ${item.price} рублей × ${item.quantity}
 <button class="remove-item">Удалить</button>
 </div>
 `;
 
 itemElement.querySelector('.remove-item').addEventListener('click', () => {
 removeFromCart(item.name);
 });
 
 cartItemsContainer.appendChild(itemElement);
 totalPrice += item.price * item.quantity;
 });
 
 totalPriceElement.textContent = `Итого: ${totalPrice} рублей`;
}

// Функция для удаления товара
function removeFromCart(productName) {
 cart = cart.filter(item => item.name !== productName);
 updateCartUI();
}

// Обработчик для всех кнопок "Добавить в корзину"
document.querySelectorAll('.main__left button').forEach(button => {
 button.addEventListener('click', (event) => {
 event.preventDefault();
 
 const container = button.closest('.main__left');
 const productName = container.querySelector('h3').textContent;
 const priceText = container.querySelector('p').textContent;
 const productPrice = parseInt(priceText.replace(/[^\d.]/g, ''));
 const productImage = container.querySelector('img').src;
 
 addToCart({
 name: productName,
 price: productPrice,
 image: productImage
 });
 });
});

// Функция для форматирования цены (опционально)
function formatPrice(price) {
 return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Получаем весь блок корзины
const cartBlock = document.querySelector('.cart');
const checkoutButton = document.querySelector('.checkout-button');

// Функция для обновления интерфейса корзины
function updateCartUI() {
 cartItemsContainer.innerHTML = '';
 let totalPrice = 0;
 
 cart.forEach(item => {
 const itemElement = document.createElement('div');
 itemElement.classList.add('cart-item');
 
 itemElement.innerHTML = `
 <img src="${item.image}" alt="${item.name}">
 <div class="product-info">
 ${item.name} - ${item.price} рублей × ${item.quantity}
 <button class="remove-item">Удалить</button>
 </div>
 `;
 
 itemElement.querySelector('.remove-item').addEventListener('click', () => {
 removeFromCart(item.name);
 });
 
 cartItemsContainer.appendChild(itemElement);
 totalPrice += item.price * item.quantity;
 });
 
 totalPriceElement.textContent = `Итого: ${totalPrice} рублей`;
 
 // Показываем/скрываем весь блок корзины
 if (cart.length > 0) {
 cartBlock.style.display = 'block';
 checkoutButton.style.display = 'block';
 } else {
 cartBlock.style.display = 'none';
 checkoutButton.style.display = 'none';
 }
}

// Остальные функции остаются без изменений


// Обработчик для кнопки "К оплате" (можно добавить функционал позже)
checkoutButton.addEventListener('click', () => {
 alert('Вы переходите к оформлению заказа!');
 // Здесь можно добавить логику обработки заказа
});
