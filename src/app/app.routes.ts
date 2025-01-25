import { Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

    {path: "", pathMatch: "full", redirectTo: "home"},
    {path: "home", component: HomeComponent},
    {path: "productos", component: ProductListComponent},
    {path: "nuevo/producto", component: ProductFormComponent},

];
