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
    return this.db.list("/shopping-cart").push({ dateCreated: new Date().getTime() });
  }

   async getCart(){
    let cartId=await this.getOrCreateCart();
    return this.db.object("/shopping-cart/" + cartId  ).valueChanges();
  }

  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    // add product to cart
    return result.key;
  }

  async addToCart(product) {
    this.updateQuantity(product,1);

  }
  async removeFromCart(product) {
    this.updateQuantity(product,-1);

  }
  private async updateQuantity(product,change){
    let cartId = await this.getOrCreateCart();
    let item$: Observable<any> = this.db
      .object("/shopping-cart/" + cartId + "/items/" + product.id)
      .valueChanges();
    let item$$ = this.db.object(
      "/shopping-cart/" + cartId + "/items/" + product.id
    );
    item$.pipe(take(1)).subscribe(item => {
       {
        item$$.update({ quantity: (item.quantity || 0 ) + change  });
        console.log("updating exisiting product ");
      }
      console.log(item$);
    });
  }
}
