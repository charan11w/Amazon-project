import { cart,resetCart} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDelivaryOption } from "../../data/delivaryOptionId.js";
import formatCurrency from "../utils/money.js";
import {addToOrders} from "../../data/orders.js";

export function renderPaymentSummay(){

  let productPriceCents=0;
  let shippingPriceCents=0;
  let cartCount=0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const delivaryOption=getDelivaryOption(cartItem.delivaryOptionId);
    shippingPriceCents += delivaryOption.priceCents;
    cartCount+=cartItem.quantity;
  })

  const totalBeforeTaxCents=productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
 
  const paymentSummaryHTML = `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartCount}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>  
          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>`
  

          document.querySelector('.js-payment-summary')
          .innerHTML=paymentSummaryHTML;

          document.querySelector('.js-place-order')
          .addEventListener('click',async () => {
            try{
              const response= await fetch('https://supersimplebackend.dev/orders',{
                method : 'POST',
                headers : {
                  'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                  cart : cart
                })
              });
  
              const order=await response.json();
              addToOrders(order);
            }
            catch(error){
              console.log('Unexpected error : please try again later');
            }

            resetCart();
            window.location.href='orders.html';
          })
}