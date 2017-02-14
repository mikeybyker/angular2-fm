import {
  Routes,
  RouterModule
} from '@angular/router';

import { ExploreComponent } from './explore.component';

const appRoutes: Routes = [
  { path: 'explore', component: ExploreComponent, data: { title: 'Explore' }, }
];

export const routing = RouterModule.forChild(appRoutes);
