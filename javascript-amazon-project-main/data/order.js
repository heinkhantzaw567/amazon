import { totalquantity } from "../scripts/cart.js";
import { datefororder, formatCurrency } from "../scripts/utils/money.js";
import { loadProductsFetch, products } from "./products.js";
export const orders = JSON.parse(localStorage.getItem('orders') ) || [] ;

export function addOrder(order)
{
    orders.unshift(order);
    saveToStorage();
    
}


function renderOrder(){

    let Html ='';
    
    orders.forEach((order)=>
    {
        let innerHtml ='';
        
        order.products.forEach((product)=>
        {
            
            let matchingitem
            products.forEach((i)=>
            {
                if (i.id === product.productId)
                {
                    matchingitem = i;
                }
            })
            
            innerHtml +=`
            <div class="product-image-container">
                    <img src="${matchingitem.image}">
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        ${matchingitem.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${datefororder(product.estimatedDeliveryTime)}              
                    </div>
                    <div class="product-quantity">
                        Quantity: ${product.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>

                    <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                    </div>`
        })
        Html += `
            <div class="order-container">
                
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${datefororder(order.orderTime)}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${innerHtml}
                    </div>
                </div>
                </div>
            `
    })
    
    document.querySelector('.js-orders-grid').innerHTML = Html


    let upperHtml = '';
    upperHtml += 
    `
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
    document.querySelector('.js-hein').innerHTML = upperHtml;
}
function saveToStorage()
{
    localStorage.setItem('orders', JSON.stringify(orders));
}

loadProductsFetch().then(()=>
    {
        renderOrder()
    });