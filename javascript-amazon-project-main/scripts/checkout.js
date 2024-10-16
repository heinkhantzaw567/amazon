import { loadProductsFetch } from '../data/products.js';
import {renderOrderSummary} from './checkout/ordersummary.js'
import { renderPaymentSummary } from './checkout/paymentcheckout.js';
import { skipweekend } from './utils/money.js';

// new Promise ((resolve) =>
// {
//     loadProducts(()=>{
//         resolve();
//     })
   
// }).then(()=>
// {
//     renderOrderSummary();
//     renderPaymentSummary();

// })

console.log(loadProductsFetch().then(()=>
{
    renderOrderSummary();
    renderPaymentSummary();
}))








