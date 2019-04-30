import { Injectable } from '@angular/core';
import { AngularFireList} from '@angular/fire/database';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { query } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories()  {
console.log(this.db.list('/categories/'));

    return this.db.list('/categories/');
  }
}
