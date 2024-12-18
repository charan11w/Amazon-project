import { cart,removeFromCart,updateQuantity , updateDelivaryId} from '../../data/cart.js';
import { products,getProduct } from '../../data/products.js'
import { formatCurrency } from '../utils/money.js';
import { calculateCartQuantity } from '../../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { delivaryOptions , getDelivaryOption} from '../../data/delivaryOptionId.js';
import { renderPaymentSummay } from './paymentSummary.js';



export function renderOrderSummary() {

  let cartSummaryHTML='';
    cart.forEach((cartItem) => {
      let productId = cartItem.productId;

      const matchingProduct=getProduct(productId);

      const delivaryOptionId = cartItem.delivaryOptionId;

      const delivaryOption=getDelivaryOption(delivaryOptionId);

      const today=dayjs();
      const delivaryDate=today.add(
        delivaryOption.delivaryDays,'days'
      );
      const dateString=delivaryDate.format(
        'dddd , MMMM D'
      );



    cartSummaryHTML +=
    `<div class="cart-item-container js-delete-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
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

        <div class="delivery-options ">
          <div class="delivery-options-title">
          Choose a delivery option:
          </div>
          ${delivaryOptionHtml(matchingProduct,cartItem)}
        </div>
      </div>
    </div>`;
    });


    function delivaryOptionHtml(matchingProduct,cartItem){
      let html='';

      delivaryOptions.forEach((delivaryOption) => {

        const today=dayjs();
        const delivaryDate=today.add(
          delivaryOption.delivaryDays,'days'
        );
        const dateString=delivaryDate.format(
          'dddd , MMMM D'
        );

        const priceString=delivaryOption.priceCents === 0
          ? 'FREE -'
          : `$${formatCurrency(delivaryOption.priceCents)} -`;

        const isChecked = delivaryOption.id === cartItem.delivaryOptionId;

          html+=

      `
        <div class="delivery-option js-delivary-option"
        data-product-id="${matchingProduct.id}"
        data-delivary-option-id="${delivaryOption.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>`

      })
      return html;
    }

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
      renderPaymentSummay();
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

    document.querySelectorAll('.js-delivary-option')
    .forEach((element) => {
      element.addEventListener('click',() => {
        const {productId,delivaryOptionId} = element.dataset;
        updateDelivaryId(productId,delivaryOptionId);
        renderOrderSummary();
        renderPaymentSummay();
      })
    })

  }

  
