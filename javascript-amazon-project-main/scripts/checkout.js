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

async function loadPage()
{
     await loadProductsFetch();
     renderOrderSummary();
     renderPaymentSummary();
}

loadPage();








