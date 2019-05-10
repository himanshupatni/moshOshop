import { AppUser } from './../models/app-user';
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from '../shopping-cart.service';
@Component({
  selector: "app-bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.scss"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
shoppingCartItemCount:number;
  constructor(public auth: AuthService, private shoppingCartService:ShoppingCartService) {

   }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser =>   this.appUser= appUser  );

    let cart$= await this.shoppingCartService.getCart();
        cart$.subscribe((cart:any) => {
          this.shoppingCartItemCount=0;
          // console.log(cart.items.getKey());
          console.log(cart.items);
          for(let productId in cart['items']){
            this.shoppingCartItemCount +=cart.items[productId].quantity;
            console.log(this.shoppingCartItemCount);
          }



        })
  }
  logout() {
    this.auth.logout();
  }
}
