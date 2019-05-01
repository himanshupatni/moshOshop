import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
product$=[];

  constructor( private productService:ProductService) {

    this.productService.getAll().subscribe((actions:any) => {

      actions.forEach(action => {

        this.product$.push({id:action.key,category:action.payload.val().category
          ,imageUrl:action.payload.val().imageUrl,price:action.payload.val().price
          ,title:action.payload.val().title});

      });
    });


setTimeout(() => {
  console.log(this.product$);
}, 2000);



   }


  ngOnInit() {
  }

}
