const saveCartItems = (target) => {
  localStorage.setItem('cartItems', target);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
