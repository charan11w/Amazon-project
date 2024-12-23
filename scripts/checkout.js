import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummay } from "./checkout/paymentSummary.js";
import { renderCheckoutHtml } from './checkout/checkoutHeader1.js';
import { loadproducts } from "../data/products.js";
// import '../data/practise-backend.js'
// import '../data/cart-class.js';

loadproducts( () =>{
  renderCheckoutHtml();
  renderOrderSummary();
  renderPaymentSummay();
})

