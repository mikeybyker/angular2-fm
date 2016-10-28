import {
  Routes,
  RouterModule
} from '@angular/router';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
