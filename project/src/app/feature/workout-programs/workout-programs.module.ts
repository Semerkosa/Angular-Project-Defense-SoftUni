import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutProgramsListComponent } from './workout-programs-list/workout-programs-list.component';
import { WorkoutProgramReviewPageComponent } from './workout-program-review-page/workout-program-review-page.component';
import { WorkoutProgramsRoutingModule } from './workout-programs-routing.module';
import { WorkoutProgramsUserListComponent } from './workout-programs-user-list/workout-programs-user-list.component';



@NgModule({
  declarations: [
    WorkoutProgramsListComponent,
    WorkoutProgramReviewPageComponent,
    WorkoutProgramsUserListComponent,
  ],
  imports: [
    CommonModule,
    WorkoutProgramsRoutingModule
  ]
})
export class WorkoutProgramsModule { }
