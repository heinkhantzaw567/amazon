import { cart,addtocart,loadfromStorage } from '../scripts/cart.js'
describe('test suite : add to cart', ()=>
{
    it('adds an exisiting,product to cart', ()=>
    {
        
    })
    it('adds an new product to cart', ()=>
    {
        spyOn(localStorage, 'getItem').and.callFake(()=>
        {
            return JSON.stringify([]);
        });
        

        loadfromStorage();
        addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
    })
})
