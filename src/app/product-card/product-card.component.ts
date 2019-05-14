import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {
@Input ('product') product:any;
 @Input ('show-actions') showActions= true;
 @Input ('shopping-cart' ) shoppingCart;
 cart;
 item:any;
subscription: Subscription;
  constructor(private shoppingCartService:ShoppingCartService) {
    // console.log("Show Actions" + this.showActions);
  }

  addToCart(){
    // console.log(this.product );

   this.shoppingCartService.addToCart(this.product);

}
removeFromCart(){
  this.shoppingCartService.removeFromCart(this.product);
}

getQuantity(){
  if(!this.shoppingCart) return 0;
  this.item =this.shoppingCart.items[this.product.id];
  // console.log("item" + item);

  return this.item ? this.item.quantity: 0;
}

}
