import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { ExploreComponent } from './explore.component';
import { ApiService } from './api-methods.service';
import { routing } from './explore.routing';
import { ServiceInputComponent } from './service-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    ExploreComponent,
    ServiceInputComponent
  ],
  exports: [ExploreComponent],
  providers: [ApiService]
})
export class ExploreModule { }
