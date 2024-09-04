export let cart =[]; 


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
}