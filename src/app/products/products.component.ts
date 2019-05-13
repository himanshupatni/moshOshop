import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/product.service";
import { Component, OnInit, Input } from "@angular/core";
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products = [];
  filteredProduct = [];
  category ;
  @Input ('product') product:any;
 @Input ('show-actions') showActions= true;
 @Input ('shopping-cart' ) shoppingCart;
 cart:any;
 subscription: Subscription;
  constructor( private shoppingCartService:ShoppingCartService,
    private route: ActivatedRoute,
    private productService: ProductService,

  ) {
    this.productService.getAll().subscribe((actions: any) => {
      actions.forEach(action => {
        this.products.push({
          id: action.key,
          category: action.payload.val().category,
          imageUrl: action.payload.val().imageUrl,
          price: action.payload.val().price,
          title: action.payload.val().title
        });
      });
    });

    route.queryParamMap.subscribe(params => {
      this.category = params.get("category");
      this.filteredProduct =(this.category)? this.products.filter(p => p.category ===this.category): this.products;
      console.log(this.category);
    });
    // console.log(this.categories);

    // console.log(this.products$);
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart =cart
      // console.log(this.cart.items);

    } );
    console.log(this.subscription);


  }

  ngOnDestroy(){
  this.subscription.unsubscribe();
  }
}
