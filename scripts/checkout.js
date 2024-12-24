import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummay } from "./checkout/paymentSummary.js";
import { renderCheckoutHtml } from './checkout/checkoutHeader1.js';
import {  loadProductsFetch} from "../data/products.js";
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
  loadProductsFetch()
  ,new Promise((resolve) =>{
    loadCart(() => {
      resolve();
    });
  })

]).then((value) => {
  renderCheckoutHtml();
  renderOrderSummary();
  renderPaymentSummay();
})


async function loadPage(){
  await loadProductsFetch();

  await new Promise((resolve) =>{
    loadCart(() => {
      resolve();
    });
  })

  renderCheckoutHtml();
  renderOrderSummary();
  renderPaymentSummay();

}

loadPage();

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




