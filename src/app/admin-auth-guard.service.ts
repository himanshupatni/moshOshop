import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { CanActivate } from '@angular/router';
import { Injectable } from "@angular/core";
import { switchMap } from "rxjs/operators";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid)

      )).pipe(map(
        (appUser:any) =>appUser.isAdmin

      ) );


  }
}
