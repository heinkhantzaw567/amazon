import{cart,addtocart,totalquantity} from './cart.js';
import{products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
let HTMl ='';
products.forEach((value, index)=>{
    HTMl +=
    `<div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src =${value.image}>
              </div>
    
              <div class="product-name limit-text-to-2-lines">
                ${value.name}
              </div>
    
              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="${value.getStartsUrl()}">
                <div class="product-rating-count link-primary">
                  ${value.rating.count}
                </div>
              </div>
    
              <div class="product-price">
                ${value.getPrice()}
              </div>
    
              <div class="product-quantity-container">
                <select class ="quantity-${value.id}">
                
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
    
              <div class="product-spacer"></div>
    
              <div class="added-to-cart added-to-cart-${value.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>
    
              <button class="add-to-cart-button button-primary"


              data-product-id="${value.id}">
                Add to Cart
              </button>
            </div>`;
});

function add_display(hein,message)
  {
    if(hein)
      {
        clearTimeout(hein);
      }
      const timeoutid = setTimeout(()=>{
        message.classList.remove('highlight')
      },2000);
  }

 
document.querySelector('.products-grid').innerHTML= HTMl;

const addedmessagestimeoutid ={}

document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
     
     

      const productId = button.dataset.productId;
      let quantity =Number(document.querySelector(`.quantity-${productId}`).value);
    
      
      let message =document.querySelector(`.added-to-cart-${productId}`);
      message.classList.add("highlight");
      
      const hein =addedmessagestimeoutid[productId];
      
      
      addtocart(productId,quantity);
      add_display(hein,message);
      
      document.querySelector(".cart-quantity").innerHTML = totalquantity();
      
      
  });
});
document.querySelector(".cart-quantity").innerHTML = totalquantity();
