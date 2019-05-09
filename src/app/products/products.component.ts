import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "./../category.service";
import { ProductService } from "src/app/product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products$ = [];
  category: string;
  filteredProduct = [];
  categories$ = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
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
    this.categoryService.getCategories().subscribe((actions: any) => {
      actions.forEach(action => {
        this.categories$.push({
          id: action.key,
          category: action.payload.val().category
        });
      });
    });
    route.queryParamMap.subscribe(params => {
      this.category = params.get("category");
      this.filteredProduct =(this.category)? this.products$.filter(p => p.category ===this.category): this.products$;
      console.log(this.category);
    });
    console.log(this.categories$);

    // console.log(this.products$);
  }

  ngOnInit() {}
}
