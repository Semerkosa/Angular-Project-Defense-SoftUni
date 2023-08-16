import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWorkoutProgram } from 'src/app/core/interfaces';
import { WorkoutProgramService } from 'src/app/core/services/workout-program.service';

@Component({
  selector: 'app-workout-programs-list',
  templateUrl: './workout-programs-list.component.html',
  styleUrls: ['./workout-programs-list.component.scss']
})
export class WorkoutProgramsListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  isLoaded = false;
  workoutPrograms: IWorkoutProgram[];

  constructor(private workoutProgramService: WorkoutProgramService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.workoutProgramService.getWorkoutPrograms$().subscribe({
      next: programs => {
        this.isLoaded = true;
        
        console.log(programs);
        this.workoutPrograms = programs;
      },
      error: (err) => {
				console.log(err);
			}
  });
  }

}
