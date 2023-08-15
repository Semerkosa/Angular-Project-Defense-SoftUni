import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutProgramsListComponent } from './workout-programs-list/workout-programs-list.component';
import { WorkoutProgramReviewPageComponent } from './workout-program-review-page/workout-program-review-page.component';
import { WorkoutProgramsRoutingModule } from './workout-programs-routing.module';



@NgModule({
  declarations: [
    WorkoutProgramsListComponent,
    WorkoutProgramReviewPageComponent,
  ],
  imports: [
    CommonModule,
    WorkoutProgramsRoutingModule
  ]
})
export class WorkoutProgramsModule { }
