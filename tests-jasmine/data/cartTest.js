import { addToCart,cart,loadFromStorage} from "../../data/cart.js";





describe('test suits : add item to the cart ',() => {

  it('add an existing item into cart',() => {
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId : `8c9c52b5-5a19-4bcb-a5d1-158a74287c53`,
        quantity  : 1,
        delivaryOptionId : 1
      }]);
    })
    loadFromStorage();
    addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
    expect(cart.length).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toBe('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
    expect(cart[0].quantity).toBe(2);

  });





  it('add new product to the cart',() => {
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([]);
    })
  
    loadFromStorage();
    addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
    expect(cart.length).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toBe('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
    expect(cart[0].quantity).toBe(1);
  })
});