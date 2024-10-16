import{ products } from '../data/products.js';

export let cart;

loadfromStorage();
export function loadfromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function emptycart()
{
    cart =[];
    saveToStorage();
}
export function removecart(productId)
{
    const newcart=[];
    cart.forEach((item) =>
    {
        if(item.productId !== productId)
        {
            newcart.push(item)
        }
    });
    if(newcart.length !== cart.length)
    {
        cart = newcart;
        saveToStorage();
    }
    
}
export function addtocart(productId,quantity)
{
  let matchingItem;
      cart.forEach((item) => {
          if (productId === item.productId) {
              matchingItem = item;
          }
      });

      if (matchingItem) {
          matchingItem.quantity += quantity; 
      } else {
          cart.push({
              productId: productId,
              quantity: quantity,
              deliveryOptionId :'1'
          });
      }
      saveToStorage();
}
export function totalquantity()
{
    let cartQuantity = 0;
      cart.forEach((item) => {
          cartQuantity += item.quantity;
      });
    return cartQuantity;
}

export function changequantity(input,id)
{
    cart.forEach((item)=>
    {
        if (item.productId === id)
        {
            item.quantity =input
        }
    });
    saveToStorage();
}

export function updateDeliveryOption(productid, deliveryOptionid)
{
    let matchingItem;
    if (deliveryOptionid === '1' | deliveryOptionid === '2'| deliveryOptionid === '3')
    {
        cart.forEach((items) =>
            {
                if (productid === items.productId)
                {
                    matchingItem= items;
                    matchingItem.deliveryOptionId=deliveryOptionid
                    saveToStorage();
                }
                   
            
            })
    }
    
    
}
export function productname(id)
{
   products.forEach((ids)=>
    {
        if(ids.id === id)
        {
            return ids.name;
        }
    }) 
}