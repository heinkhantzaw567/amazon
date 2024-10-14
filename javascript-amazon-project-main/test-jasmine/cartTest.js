import { cart,addtocart,loadfromStorage, removecart, totalquantity } from '../scripts/cart.js'
describe('test suite : add to cart', ()=>
{   
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    beforeEach(()=>
    {
        spyOn(localStorage,'setItem');
    })
    afterEach(()=>
    {
      document.querySelector('.order-summary').innerHTML ='';
    })
    it('adds an exisiting,product to cart', ()=>
    {
        
        
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
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',`${JSON.stringify(cart)}`);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(3)
    });
    it('adds an new product to cart', ()=>
    {
        
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
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',`${JSON.stringify(cart)}`);
    });
    it('remove a new product ',()=>
    {
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
            productId: productId1,
            quantity: 2,
            deliveryId :'1'
        
            }, {
            productId: productId2,
            quantity: 1,
            deliveryId:'2'
            }]);
        });
        loadfromStorage();
        removecart(productId1);
        expect(cart.length).toEqual(1);
        removecart("qwqeqr");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    })

})
