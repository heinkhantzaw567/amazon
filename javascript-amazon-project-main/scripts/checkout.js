import {cart,removecart,totalquantity,changequantity} from './cart.js';
import { products } from '../data/products.js';
import { formatCurrency,formatdate} from './utils/money.js';
let today =dayjs();
let freedeliverydate = dayjs().add(7,'days');
let threedate = dayjs().add(5,'days');
let onedate = dayjs().add(1,'days');
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
    
    Html +=`<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${formatdate(freedeliverydate)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)};
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id ="${matchingItem.id}">
                    Update
                    </span>
                    <input class ="quantity-input js-quantity-input-${matchingItem.id}" >
                   <span class ="save-quantity-link link-primary" data-product-id ="${matchingItem.id}">Save</span>
             
                  <span class ="form-${matchingItem.id}">
                  
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id ="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${formatdate(freedeliverydate)}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                    ${formatdate(threedate)}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                    ${formatdate(onedate)}
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
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

    const container =document.querySelector(`.js-cart-item-container-${productId}`);
     container.remove();
    
    checkingout();
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
    }
  });
});

function action(input, productid, container) {
  if (input > 0 && input < 10000) {
    changequantity(input, productid);
    document.querySelector(`.js-quantity-label-${productid}`).innerHTML = input;
    container.classList.remove('is-editing-quantity');
    checkingout();
  }
}

