import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import {  take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
categories$;
product ={};
id;
  constructor(
    private router: Router, private route :ActivatedRoute,
    private db:AngularFireDatabase, private productService:ProductService) {
   this.categories$= this.db.list('/categories').valueChanges();
  this.id = this.route.snapshot.paramMap.get('id');
console.log("id"+this.id);

if(this.id){
  this.productService.get(this.id).valueChanges().subscribe( p=> this.product =p);

}
// console.log(this.product);

}
  ngOnInit() {  }
  onSave(product){
    console.log(product);
    if(this.id)
    this.productService.update(this.id,product);
    else
    this.productService.save(product);
    this.router.navigate(['/admin/products'])
  }
  delete(){
    if(confirm('Are you sure you want to delete this product ?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products'])
    }
  }
}
