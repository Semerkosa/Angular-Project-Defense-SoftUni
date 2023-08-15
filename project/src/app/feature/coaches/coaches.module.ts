import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachListComponent } from './coach-list/coach-list.component';
import { CoachReviewPageComponent } from './coach-review-page/coach-review-page.component';
import { RouterModule } from '@angular/router';
import { CoachesRoutingModule } from './coaches-routing.module';



@NgModule({
  declarations: [
    CoachListComponent,
    CoachReviewPageComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule,
  ]
})
export class CoachesModule { }
