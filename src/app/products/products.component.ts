import { ProductService } from "src/app/product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products$ = [];
  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe((actions: any) => {
      actions.forEach(action => {
        this.products$.push({
          id: action.key,
          category: action.payload.val().category,
          imageUrl: action.payload.val().imageUrl,
          price: action.payload.val().price,
          title: action.payload.val().title
        });
      });
    });
    console.log(this.products$);
  }

  ngOnInit() {}
}
