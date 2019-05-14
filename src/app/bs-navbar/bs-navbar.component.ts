import { AppUser } from "./../models/app-user";
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";
@Component({
  selector: "app-bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.scss"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;

  cart$: any;
  constructor(
    public auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));

    this.cart$ = await this.shoppingCartService.getCart();
  }
  logout() {
    this.auth.logout();
  }
}
