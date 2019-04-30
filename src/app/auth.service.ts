import { AppUser } from './models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Observable ,of} from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { UserService } from './user.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
  }
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    console.log(returnUrl);
    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  // get appUser$(): Observable<AppUser>{

  //   return this.user$.pipe(switchMap(user => this.userService.get(user.uid)));

  // }
  get appUser$(): Observable<any>{
    return this.user$
    // .pipe(map(user => {
    //   console.log(user.displayName);
    //   console.log(user.email);

      // if(user) return this.userService.get(user.uid)


    //   // return of(null);
    //  }))
  }
}
