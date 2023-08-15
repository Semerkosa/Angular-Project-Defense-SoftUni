import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutProgramsListComponent } from './workout-programs-list/workout-programs-list.component';
import { WorkoutProgramReviwPageComponent } from './workout-program-reviw-page/workout-program-reviw-page.component';



@NgModule({
  declarations: [
    WorkoutProgramsListComponent,
    WorkoutProgramReviwPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WorkoutProgramsModule { }
