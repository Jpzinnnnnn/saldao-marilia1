import { Routes } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'produto/:id', component: ProductDetailComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'contato', component: ContactComponent }
];