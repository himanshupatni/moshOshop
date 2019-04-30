import { AppUser } from './../models/app-user';
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.scss"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  constructor(public auth: AuthService) {
    auth.appUser$.subscribe(appUser =>
      {
        this.appUser= appUser
        console.log(appUser,this.appUser)
      console.log(this.appUser.isAdmin);

    });

   }

  ngOnInit() {}
  logout() {
    this.auth.logout();
  }
}
