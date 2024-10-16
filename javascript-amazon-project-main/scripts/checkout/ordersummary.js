import {cart,removecart,totalquantity,changequantity, updateDeliveryOption} from '../cart.js';
import { products } from '../../data/products.js';
import { adddate, formatCurrency,formatdate, skipweekend} from '../utils/money.js';
import { deliveryOptions } from '../devliveryoption.js';
import { renderPaymentSummary } from './paymentcheckout.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import '../../data/backend-practice.js'

export function renderOrderSummary()
{
  let today =dayjs();
  let Html= '';
  cart.forEach((item)=>{
    const productId = item.productId;
    let matchingItem;
    products.forEach((product)=>
    {
        if(product.id === productId)
        {
            matchingItem= product;
        }
        
    });
    // console.log(item.deliveryOptionId)
    const deliveryOptionsid = item.deliveryOptionId;
    // console.log(deliveryOptionsid);
    let deliveryOption;
    deliveryOptions.forEach ((options) =>
    {
      if (options.id === deliveryOptionsid)
      {
        deliveryOption =options
      }
    })
    console.log(deliveryOption);
    Html +=`<div class="cart-item-container  js-cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${formatdate (adddate (today, deliveryOption.days))}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name 
                 product-name-${matchingItem.id}">
                  ${matchingItem.name}
                </div>
                <div class="product-price 
                product-price-${matchingItem.id}">
                  ${matchingItem.getPrice()}
                </div>
                <div class="product-quantity 
                  js-product-quantity-${matchingItem.id}">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary 
                  update-quantity-link-${matchingItem.id}" data-product-id ="${matchingItem.id}">
                    Update
                    </span>
                    <input class ="quantity-input js-quantity-input-${matchingItem.id}" >
                   <span class ="save-quantity-link link-primary" data-product-id ="${matchingItem.id}">Save</span>
             
                  <span class ="form-${matchingItem.id}">
                  
                  <span class="delete-quantity-link link-primary js-delete-link 
                  js-delete-link-${matchingItem.id}" data-product-id ="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryHTml(matchingItem,item)}
                
                               
                
              </div>
            </div>
          </div>`;
});

document.querySelector(".order-summary").innerHTML =Html;


document.querySelectorAll(".js-delete-link").forEach((link)=>
{
  link.addEventListener('click',()=>
  {
    const productId =link.dataset.productId;
    removecart(productId);
    renderOrderSummary();
    renderPaymentSummary();
  });
});



function checkingout()

{
  let checkout =`Checkout (<a class="return-to-home-link"
  href="amazon.html">${totalquantity()} items</a>)`

document.querySelector('.checkout-header-middle-section').innerHTML =checkout;
}
checkingout();

let Updateforn =``;

document.querySelectorAll(`.update-quantity-link`).forEach((button)=>
{
  button.addEventListener('click',()=>
  {
    
    const productid = button.dataset.productId;
    
   
    const container = document.querySelector(`.js-cart-item-container-${productid}`);
    container.classList.add('is-editing-quantity');
    
  });
}); 

function handleQuantityChange(link) {
  const productid = link.dataset.productId;
  const container = document.querySelector(`.js-cart-item-container-${productid}`);
  const input = Number(document.querySelector(`.js-quantity-input-${productid}`).value);
  action(input, productid, container);
  renderPaymentSummary();
}

document.querySelectorAll('.save-quantity-link').forEach((link) => {
  const productid = link.dataset.productId;
  const container = document.querySelector(`.js-cart-item-container-${productid}`);
  const inputField = document.querySelector(`.js-quantity-input-${productid}`);
  
  // Initial action call if needed
  action(Number(inputField.value), productid, container);

  // Click event listener
  link.addEventListener('click', () => handleQuantityChange(link));
  
  // Enter key event listener
  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleQuantityChange(link);
      renderPaymentSummary()
    }
  });
});

function action(input, productid, container) {
  if (input > 0 && input < 10000) {
    changequantity(input, productid);
    document.querySelector(`.js-quantity-label-${productid}`).innerHTML = input;
    container.classList.remove('is-editing-quantity');
    
    renderOrderSummary();
    renderPaymentSummary();
  }
}

function deliveryHTml(matchingItem,item)
{
  let Html =``;
  deliveryOptions.forEach((options) =>
  {
    
    
    let formattedPrice = options.priceCent === 0 ? "Free" : "$"+formatCurrency(options.priceCent);
    const isChecked = options.id === item.deliveryOptionId ;
    let days = skipweekend(options.days,today)
    Html +=`<div class="delivery-option js-delivery-option
           js-delivery-option-${matchingItem.id}"
           data-product-id =${matchingItem.id}
           data-delivery-option-id =${options.id}>
                    <input type="radio"
                      ${isChecked ? 'checked' :''}
                      class="delivery-option-input
                            delivery-option-input-${matchingItem.id}-${options.id}"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                      ${formatdate(adddate(today,days))}
                      </div>
                      <div class="delivery-option-price">
                         ${formattedPrice} - Shipping
                      </div>
                    </div>
                  </div>`
  });
  return Html
}
document.querySelectorAll(`.js-delivery-option`).forEach((element) =>
{
  element.addEventListener( 'click' ,() =>
  {
    
    const {productId, deliveryOptionId}=element.dataset
    updateDeliveryOption(productId,deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  })
})
}


