import { SimpleBreadcrumbsComponent } from './shared/simple-breadcrumbs.component';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent, data: { title: 'About' } }
];

export const routing = RouterModule.forRoot(appRoutes);
