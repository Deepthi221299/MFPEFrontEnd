import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './auth/authorization.guard';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'Product',
    component: ProductComponent,
    //canActivate: [AuthorizationGuard],
  },
  {
    path: 'Wishlist',
    component: WishlistComponent,
    canActivate: [AuthorizationGuard],
  },
  { path: 'Cart',
   component: CartComponent,
   canActivate:[AuthorizationGuard]
   },
  {
    path: 'login',
    component: LoginComponent,
    
  },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
