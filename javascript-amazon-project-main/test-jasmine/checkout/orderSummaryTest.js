import { renderOrderSummary } from "../../scripts/checkout/ordersummary.js";
import { loadfromStorage,cart,productname } from "../../scripts/cart.js";
import { loadProducts,loadProductsFetch } from "../../data/products.js";

describe('test suit: renderOrderSummary', ()=>
{
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  beforeAll((done)=>
  {
    loadProductsFetch().then(()=>
    {
      done();
    })
    
  })
  beforeEach(()=>
  {
    
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary">
      </div>
      <div class ="checkout-header-middle-section">
      </div>
      <div class="js-payment-summary"></div>`;
    spyOn(localStorage, 'setItem');
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
    
    renderOrderSummary();
  });
  afterEach(()=>
  {
    document.querySelector('.order-summary').innerHTML ='';
    document.querySelector('.js-test-container').innerHTML ='';
  })
    it('adds an exisiting,product to cart', ()=>
        {
          
          expect(document.querySelector(`.product-name-${productId1}`).innerHTML.trim())
          .toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
          expect(document.querySelector(`.product-name-${productId2}`).innerHTML.trim())
          .toEqual('Intermediate Size Basketball');
          expect(document.querySelector(`.product-price-${productId1}`).innerHTML.trim())
          .toEqual('$10.90');
          expect(document.querySelector(`.product-price-${productId2}`).innerHTML.trim())
          .toEqual('$20.95');
          expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
          expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2')
          expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1')
        
          
        });

        it('removes a product',()=>
        {
          
          document.querySelector(`.js-delete-link-${productId1}`).click();
          expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
          expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
            expect(
              document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
            expect(
              document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
            expect(cart.length
            ).toEqual(1);
            expect(cart[0].productId).toEqual(productId2);
        });
        it('update the cart',()=>
        {
          document.querySelector(`.delivery-option-input-${productId1}-${3}`).click();
          expect(cart[0].deliveryId).toEqual('3');
          expect(document.querySelector(`.delivery-option-input-${productId1}-${3}`).checked).toBe(true)
          expect(cart.length).toEqual(2);
          expect(document.querySelector(`.payment-summary-money-shipping`).innerHTML).toEqual('$14.98');
          expect(document.querySelector(`.payment-summary-money-total`).innerHTML).toEqual('$63.50');
          
        });
        
    });
