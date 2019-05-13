import { AngularFireDatabase } from "@angular/fire/database";
import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/take';
import { take } from "rxjs/operators";
import { Product } from "./models/product";
import { Observable } from "rxjs";
import { promise } from 'protractor';
import { ShoppingCart } from './models/shopping-cart';
@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}
  create() {
    return this.db.list("/shopping-carts").push({ dateCreated: new Date().getTime() });
  }

   async getCart() {
    let cartId=await this.getOrCreateCart();
    console.log(cartId);

    return this.db.object("/shopping-carts/" + cartId  ).valueChanges();
  }

  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem("cartId");
    console.log(cartId);

    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem("cartId", result.key);
console.log(result.key);

    // add product to cart
    return result.key;
  }
  async addToCart(product) {
    let cartId = await this.getOrCreateCart();
    let item$: Observable<any> = this.db.object('/shopping-carts/' + cartId + '/items/' + product.id).valueChanges();
    let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.id);
    item$.pipe(take(1)).subscribe( item => {
      if( item === null ) {
         item$$.set({product: product, quantity: 1});
         console.log('adding new product to cart');
     }else{
         item$$.update({quantity: item.quantity + 1});
         console.log('updating exisiting product ');
    }
 }); }
 async removeFromCart(product) {
  let cartId = await this.getOrCreateCart();
  let item$: Observable<any> = this.db.object('/shopping-carts/' + cartId + '/items/' + product.id).valueChanges();
  let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.id);
  item$.pipe(take(1)).subscribe( item => {
    if( item === null ) {
       item$$.set({product: product, quantity: 1});
       console.log('adding new product to cart');
   }else{
       item$$.update({quantity: item.quantity - 1});
       console.log('updating exisiting product ');
  }
}); }

  // async  addToCart(product) {
  //   console.log(product);

  //   this.updateQuantity(product,1);

  // }
  // async removeFromCart(product) {
  //   this.updateQuantity(product,-1);

  // }
  // private async updateQuantity(product,change){
  //   let cartId = await this.getOrCreateCart();
  //   let item$: Observable<any> = this.db
  //     .object("/shopping-cart/" + cartId + "/items/" + product.id)
  //     .valueChanges();
  //   let item$$ = this.db.object(
  //     "/shopping-cart/" + cartId + "/items/" + product.id
  //   );
  //   item$.pipe(take(1)).subscribe(item => {
  //      {
  //       item$$.update({ quantity: (item.quantity || 0 ) + change  });
  //       console.log("updating exisiting product ");
  //     }
  //     console.log(item$);
  //   });
  // }
}
