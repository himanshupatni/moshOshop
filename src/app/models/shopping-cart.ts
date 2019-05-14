import { ShoppingCartitem } from './shopping-cart-item';
export class ShoppingCart{
constructor(public items: ShoppingCartitem[]){

}

get productIds(){
  return Object.keys(this.items);
}

get totalItemsCount(){
   let count =0;
  for(let productId in this.items){
    count +=this.items[productId].quantity
    console.log(this.items[productId].product.title);
}
return count;
}
}
