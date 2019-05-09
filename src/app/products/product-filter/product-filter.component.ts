import { CategoryService } from "./../../category.service";
import { Component, OnInit , Input} from "@angular/core";

@Component({
  selector: "app-product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.scss"]
})
export class ProductFilterComponent implements OnInit {
  categories = [];
  @Input('category') category: string;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe((actions: any) => {
      actions.forEach(action => {
        this.categories.push({
          id: action.key,
          category: action.payload.val().category
        });
      });
    });
  }

  ngOnInit() {}
}
