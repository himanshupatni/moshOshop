import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { CanActivate } from '@angular/router';
import { Injectable } from "@angular/core";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe(map(
        (appUser:any) =>appUser.isAdmin

      ) );


  }
}
