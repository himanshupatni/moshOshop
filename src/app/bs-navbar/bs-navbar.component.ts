import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
user: firebase.User;
  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => this.user = user );

  }

  ngOnInit() {
  }
  logout(){


    this.afAuth.auth.signOut();
            }

}
