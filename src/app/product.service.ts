import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  save(product){

    return this.db.list('/products').push(product);
  }

  getAll()
  {
       return this.db.list('/products').snapshotChanges(['child_added']);


    }
    get(productId){

      return this.db.object('/products/' + productId);
    }
    update(productId, product){
      return this.db.object('/products/'+productId).update(product);
    }
    delete(productId){
      return this.db.object('/products/'+productId).remove();

    }
}
