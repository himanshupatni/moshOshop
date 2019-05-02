import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "src/app/product.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.scss"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  product$ = [];
  subscription: Subscription;
  fileteredProducts: any[];
  produc: Boolean = true;
  filterproduct: Boolean = false;
  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe((actions: any) => {
        this.fileteredProducts = actions.forEach(action => {
          this.product$.push({
            id: action.key,
            category: action.payload.val().category,
            imageUrl: action.payload.val().imageUrl,
            price: action.payload.val().price,
            title: action.payload.val().title
          });
        });
      });

    setTimeout(() => {
      console.log(this.product$);
    }, 2000);
  }
  ngOnInit() {}

  filter(keyword) {
    console.log(keyword);
    this.filterproduct = true;
    this.produc = false;
    this.fileteredProducts = keyword
      ? this.product$.filter(p =>
          p.title.toLowerCase().includes(keyword.toLowerCase())
        )
      : this.product$;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
