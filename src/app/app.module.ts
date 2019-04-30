import { AdminAuthGuardService } from "./admin-auth-guard.service";
import { UserService } from "./user.service";
import { AuthGuardService } from "./auth-guard.service";
import { AuthService } from "./auth.service";
import { LoginComponent } from "./login/login.component";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { ProductFormComponent } from "./admin/product-form/product-form.component";
import { CategoryService } from "./category.service";
import {CustomFormsModule} from 'ng2-validation';
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    CustomFormsModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: " ", component: HomeComponent },
      { path: "products", component: ProductsComponent },
      { path: "shopping-cart", component: ShoppingCartComponent },
      { path: "login", component: LoginComponent },

      {
        path: "my/orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "order-success",
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService]
      },

      {
        path: "admin/products",
        component: AdminProductsComponent
      },
      {
        path: "admin/products/new",
        component: ProductFormComponent
      },
      {
        path: "admin/orders",
        component: AdminOrdersComponent
      }
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
