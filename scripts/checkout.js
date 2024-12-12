import { cart,removeFromCart,updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js'
import { formatCurrency } from './utils/money.js';
import { calculateCartQuantity } from '../data/cart.js';


let cartSummaryHTML='';

cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if(product.id == productId){
      matchingProduct = product;
    } 
  });

cartSummaryHTML +=
`<div class="cart-item-container js-delete-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
    src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${formatCurrency(matchingProduct.priceCents)}
      </div>
     <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-link"
          data-product-id="${matchingProduct.id}">
          Update
        </span>
          <input class="quantity-input js-quantity-link-${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
          </span>
        <span class="delete-quantity-link link-primary 
        js-delete-link" data-product-id="${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
       Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
          <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
          <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
});

document.querySelector('.js-order-summary')
.innerHTML=cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
.forEach((link) => {
  link.addEventListener('click',() => {
    const {productId}=link.dataset;
    removeFromCart(productId);
    const container=document.querySelector(`.js-delete-container-${productId}`)

  container.remove();
  updateCartQuantity();
  })
})

updateCartQuantity();

function updateCartQuantity(){
 let cartQuantity= calculateCartQuantity(cart);
  document.querySelector('.js-checkout-link').innerHTML=`${cartQuantity} items`;
 }

 document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      
      const container = document.querySelector(
        `.js-delete-container-${productId}`
      );
      container.classList.add('is-editing-quantity');

      document.body.addEventListener('keydown',(Event) => {
        if(Event.key === 'Enter'){
          updateQuantityALL(link);
        }
      })
  });
});


function updateQuantityALL(link){
  const productId = link.dataset.productId;
      const inputValue=document.querySelector(`.js-quantity-link-${productId}`);
      const newQuantity =Number(inputValue.value);

      if(newQuantity < 0 || newQuantity > 10){
        alert('maximum quantity is 10 , please update correctly')
        return;
      }

      updateQuantity(productId,newQuantity);

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();

      const container = document.querySelector(
        `.js-delete-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');
  
}

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      updateQuantityALL(link);
    });
  });

  document.body.addEventListener('keydown',(Event) => {
    console.log(Event.key)
  })
