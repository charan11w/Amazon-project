import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummay } from "./checkout/paymentSummary.js";
import { renderCheckoutHtml } from './checkout/checkoutHeader1.js';
import { loadproducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/practise-backend.js'
// import '../data/cart-class.js';

/*
new Promise((resolve) => {
  loadproducts(() => {
    resolve();
  })
}).then(() => {
  renderCheckoutHtml();
  renderOrderSummary();
  renderPaymentSummay();
})
*/

/*
loadproducts(()=>{
  loadCart(()=>{
    renderCheckoutHtml();
    renderOrderSummary();
    renderPaymentSummay();
  })
})
*/


Promise.all([
  new Promise((resolve) =>{
    loadproducts(() => {
      resolve('value-1');
    });
  }),new Promise((resolve) =>{
    loadCart(() => {
      resolve();
    });
  })

]).then((value) => {
  console.log(value);
  renderCheckoutHtml();
  renderOrderSummary();
  renderPaymentSummay();
})

/*
new Promise((resolve) =>{
  loadproducts(() => {
    resolve('value-1');
  })
}).then((value)=>{
  console.log(value);
  return new Promise((resolve) =>{
    loadCart(() => {
      resolve();
    })
  })
}).then(()=>{
  renderCheckoutHtml();
  renderOrderSummary();
  renderPaymentSummay();
})
*/




