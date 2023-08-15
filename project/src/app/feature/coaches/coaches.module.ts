import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachListComponent } from './coach-list/coach-list.component';
import { CoachReviewPageComponent } from './coach-review-page/coach-review-page.component';



@NgModule({
  declarations: [
    CoachListComponent,
    CoachReviewPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoachesModule { }
