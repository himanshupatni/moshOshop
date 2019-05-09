import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";
import { CanActivate } from "@angular/router";
import "rxjs/operators";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(router, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(
      map(user => {
        if (user) return true;

        this.router.navigate(["/login"], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      })
    );
  }
}
