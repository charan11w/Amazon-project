class Cart{
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey=localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    
    this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));
    if(!this.cartItems){
    this.cartItems=  [{ 
        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity  : 2,
        delivaryOptionId : '1'
      },{
        productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity  : 1,
        delivaryOptionId :'2'
      }]
    }}

    
    saveToStorage(){
      localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }

    addToCart (productId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
    
    
       if(matchingItem){
         matchingItem.quantity += 1;
        
      }else{
        this.cartItems.push({
          productId,
          quantity:1,
          delivaryOptionId : '1'
        });
      }
      this.saveToStorage();
     }

     removeFromCart(productId){
      const newCart=[];
        
        this.cartItems.forEach((cartItem) => {
          if(cartItem.productId !== productId){
            newCart.push(cartItem);
          }
        });
    
        this.cartItems=newCart;
        this.saveToStorage();
      }

      calculateCartQuantity(cart){
        let cartQuantity=0;
        this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
       })
       return cartQuantity;
      }

      updateQuantity(productId,newQuantity){
        this.cartItems.forEach((cartItem) => {
          if(cartItem.productId === productId){
            cartItem.quantity=newQuantity;
          }
        })
        this.saveToStorage();
      }


      updateDelivaryId(productId,delivaryId){
  
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
          if(cartItem.productId === productId){
             matchingItem=cartItem;
          }
        });
    
        matchingItem.delivaryOptionId = delivaryId;
    
        this.saveToStorage();
      }
}





const cart1=new Cart('cartItems');
const businessCart=new Cart('businessCart');




console.log(cart1);
console.log(businessCart);













 


 

 

  