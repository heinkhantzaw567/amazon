import { cart,totalquantity,emptycart } from "../cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../devliveryoption.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/order.js";
export function renderPaymentSummary()
{
    let beforetax =totalprice()+shippingfee()
    let tax =beforetax* 0.10;
    let after=formatCurrency(beforetax+tax);
  
    let html ='';
    html=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalquantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalprice())}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money-shipping">$${formatCurrency(shippingfee())}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(beforetax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money-total">$${after}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>`

     document.querySelector(`.js-payment-summary`).innerHTML =html
    console.log(cart)
    if (cart && cart.length > 0) { 
      document.querySelector('.js-place-order')
        .addEventListener('click', async () => {
          try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ cart })
            });
    
            const order = await response.json();
            console.log(cart);
            addOrder(order);
    
          } catch (error) {
            console.log('Unexpected error. Try again later.');
          }
          emptycart();
          window.location.href = 'orders.html';
        });
    } else {
      console.log('The cart is empty. Cannot place an order.');
    }
    
    }
    
function shippingfee()
{
    let total=0
    cart.forEach((item)=>
    {
        let deliveryprice;
        deliveryOptions.forEach((option)=>
        {
            if (item.deliveryOptionId === option.id )
            {
                deliveryprice = Number(option.priceCent);
            }
        })
        total += deliveryprice;
    })
    return total;
    
}
function totalprice()
{
    let total=0
    cart.forEach((item)=>
    {
        let itemprice
        products.forEach((price)=>
        {
            if (item.productId === price.id)
            {
                itemprice = Number(price.priceCents)
            }
        })
        total += itemprice * item.quantity;
    })
    return total
}
