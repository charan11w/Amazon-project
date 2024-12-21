import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummay } from "./checkout/paymentSummary.js";
import { renderCheckoutHtml } from './checkout/checkoutHeader1.js';
import '../data/cart-class.js';

renderCheckoutHtml();
renderOrderSummary();
renderPaymentSummay();