import { cart,addToCart } from '../data/cart.js';
import { products , loadProductsFetch} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { calculateCartQuantity } from '../data/cart.js';


loadProductsFetch(renderProductsGrid);

function renderProductsGrid(){
  let productHtml='';
products.forEach((product) => {
  productHtml +=`
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option  selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `
});

document.querySelector('.js-html').innerHTML=productHtml;

const addedMessageTimeouts={};


function updateCartQuantity(){
  let cartQuantity=calculateCartQuantity(cart)

   if(cartQuantity === 0){
    document.querySelector('.js-cart-quantity').innerHTML=``;
   }else{
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
   }
 }

 updateCartQuantity();



document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
  button.addEventListener('click',() => {
    const {productId}=button.dataset;
    const addedMessage=document.querySelector(`.js-added-to-cart-${productId}`)
    addedMessage.classList.add('js-added-visible')
    const messageTimeoutId=addedMessageTimeouts[productId];

    if(messageTimeoutId){
      clearInterval(messageTimeoutId);
    }

    const timeoutId=setTimeout(() => {
      addedMessage.classList.remove('js-added-visible')
    },2000)

    addedMessageTimeouts[productId]=timeoutId;


   addToCart(productId,'m');
   updateCartQuantity( );
    
  })
})
}
