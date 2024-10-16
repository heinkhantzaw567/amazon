import { totalquantity } from "../scripts/cart.js";
import { orders } from "./order.js";
import { products, loadProductsFetch} from "./products.js";
console.log(orders)
function loadTracking()
{
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    let matchingitem
    let quantity
    products.forEach((i)=>
        {
            if (i.id === productId)
            {
                matchingitem = i;
            }
        });
    orders.forEach((order)=>
    {
        if(orderId === order.id)
        {
            
            order.products.forEach((product)=>
            {
                if (productId === product.productId)
                {
                    quantity = product.quantity;
                }
            });
            
        }
    })
    let Html =''
    Html += 
    
    `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on Monday, June 13
        </div>

        <div class="product-info">
          ${matchingitem.name}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${matchingitem.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `

    document.querySelector('.order-tracking').innerHTML =Html;
    
    let upperHtml =''
    upperHtml = `
    <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="cart-quantity">${totalquantity()}</div>
          <div class="cart-text">Cart</div>
        </a>

    `
    ;
    document.querySelector('.js-hein').innerHTML = upperHtml;
}

loadProductsFetch().then(()=>
{
    loadTracking();
})