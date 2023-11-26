import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'splash', pathMatch: 'full' },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'splash',
                loadChildren: () => import('./../splash-screen/splash-screen.module').then(m => m.SplashScreenModule),
            },
            {
                path: 'products',
                loadChildren: () => import('./../product/product-list/product-list.module').then(m => m.ProductListModule),
            },
            {
                path: 'cart',
                loadChildren: () => import('./../cart/cart-list/cart-list.module').then(m => m.CartListModule),
            },
        ],
        canActivateChild: [AuthenticationGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }