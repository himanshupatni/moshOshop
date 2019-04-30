import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { ProductService } from 'src/app/product.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
categories$: AngularFireList<any[]>;

  constructor(private db:AngularFireDatabase, private productService:ProductService) {
this.categories$= this.db.list('/categories');
    console.log(this.categories$);



  }

  ngOnInit() {
  }
  onSave(product){
    console.log(product);
    this.productService.save(product);


  }

}
