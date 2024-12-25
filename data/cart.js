export let cart;

loadFromStorage();

export function loadFromStorage(){
  
cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
cart=  [{ 
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity  : 2,
    delivaryOptionId : '1'
  },{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity  : 1,
    delivaryOptionId :'2'
  }]

}
}



function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart (productId,type) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(type === 'm'){
    const quantitySelector=document.querySelector(`.js-quantity-selector-${productId}`)
   const quantity=Number(quantitySelector.value);

    if(matchingItem){
     matchingItem.quantity += quantity; 
    }else{
    cart.push({
      productId,
      quantity,
      delivaryOptionId : '1'
    });
    }
  }else if(type === 's'){
    if(matchingItem){
      matchingItem.quantity += 1; 
   }else{
     cart.push({
       productId,
       quantity: 1,
       delivaryOptionId : '1'
     });
   }
  }
  saveToStorage();
 }

 
 export function 
 removeFromCart(productId){
  const newCart=[];
    
    cart.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });

    cart=newCart;
    saveToStorage();
  }

  export function calculateCartQuantity(cart){
    let cartQuantity=0;
    cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
   })
   return cartQuantity;
  }

  export function updateQuantity(productId,newQuantity){
    cart.forEach((cartItem) => {
      if(cartItem.productId === productId){
        cartItem.quantity=newQuantity;
      }
    })
    saveToStorage();
  }

  export function updateDelivaryId(productId,delivaryId){

    let matchingItem;
    cart.forEach((cartItem) => {
      if(cartItem.productId === productId){
         matchingItem=cartItem;
      }
    });

    matchingItem.delivaryOptionId = delivaryId;

    saveToStorage();
  }

  export function loadCart(fun){
    const xhr=new XMLHttpRequest();
  
    xhr.addEventListener('load',() => {
      fun();
    })
   
    
    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
  }

  export function resetCart() {
    cart=[];
    saveToStorage();
  }