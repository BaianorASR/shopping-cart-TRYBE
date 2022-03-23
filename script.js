const itemContainer = document.querySelector('.items');
const cartOL = document.getElementsByClassName('cart__items')[0];
const total = document.querySelector('.total-price');

const sumCart = () => {
  const price = [...cartOL.childNodes]
  .reduce((acc, el) => acc + Number(el.getAttribute('value')), 0);
  total.innerText = Number.isInteger(price) ? price : Number(price.toFixed(2));
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cartOL.innerHTML);
  sumCart();
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.setAttribute('value', salePrice);
  return li;
};

const addToCart = async (id, fn) => {
  const data = await fetchItem(id);
  cartOL.appendChild(fn(data));
  saveCartItems(cartOL.innerHTML);
  sumCart();
};

const button = (id) => {
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', () => {
    addToCart(id, createCartItemElement);
  });
  return btn;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image.replace('I.jpg', 'J.jpg')));
  section.appendChild(button(sku));
  return section;
};

document.querySelector('.empty-cart').addEventListener('click', () => {
  cartOL.innerHTML = '';
  localStorage.removeItem('cartItems');
  total.innerText = '00.00';
});

const createLoad = () => {
    const span = document.createElement('span');
    span.innerText = 'carregando...';
    span.className = 'loading';
    itemContainer.appendChild(span);
};

const removeLoad = () => {
  document.querySelector('.loading').remove();
};

const initCatalogo = async () => {
  createLoad();
  const { results } = await fetchProducts('computador');
  results.forEach(({ id, title, thumbnail }) => {
    itemContainer.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
  removeLoad();
};

const getLScart = () => {
  cartOL.innerHTML = getSavedCartItems();
  [...cartOL.childNodes].forEach((el) => el.addEventListener('click', cartItemClickListener));
  sumCart();
};

window.onload = () => {
  initCatalogo();
  getLScart();
};
