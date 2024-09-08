export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
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
    cart = newcart;
    saveToStorage();
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
              quantity: quantity
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

