import {cart,removecart,totalquantity,changequantity} from './cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
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
              Delivery date: Tuesday, June 21
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
                    <input class ="quantity-input" >
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
                      Tuesday, June 21
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
                      Wednesday, June 15
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
                      Monday, June 13
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

document.querySelectorAll(`.save-quantity-link`).forEach((link) =>
{
  link.addEventListener('click', ()=>
  {
    const productid = link.dataset.productId;
    
   
    const container = document.querySelector(`.js-cart-item-container-${productid}`);
    let input = Number(document.querySelector('.quantity-input').value);
    changequantity(input,productid);
    document.querySelector(`.js-quantity-label-${productid}`).innerHTML = input;
    container.classList.remove('is-editing-quantity');
    checkingout();

  });
});
