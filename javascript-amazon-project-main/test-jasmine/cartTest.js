import { cart,addtocart,loadfromStorage } from '../scripts/cart.js'
describe('test suite : add to cart', ()=>
{
    it('adds an exisiting,product to cart', ()=>
    {
        spyOn(localStorage,'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>
        {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryId :'1' 
                }
            ]);
        });
        

        loadfromStorage();
        addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',2);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(3)
    })
    it('adds an new product to cart', ()=>
    {
        spyOn(localStorage,'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>
        {
            return JSON.stringify([]);
        });
        

        loadfromStorage();
        addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1)
    })
})
