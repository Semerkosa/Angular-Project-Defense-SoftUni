import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { emailValidator, passwordValidator } from 'src/app/auth/utils';
import { IWorkoutProgram } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';
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
	isAdmin = false;
	shouldShowCreateForm = false;

	constructor(
		private workoutProgramService: WorkoutProgramService,
		private userService: UserService,
		private formBuilder: FormBuilder) { }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnInit(): void {
		this.isAdmin = this.userService.isAdmin();

		this.subscription = this.workoutProgramService.getWorkoutPrograms$().subscribe({
			next: (programs) => {
				this.isLoaded = true;

				console.log(programs);
				this.workoutPrograms = programs;
			},
			error: (err) => {
				this.isLoaded = true;
				console.log(err);
			}
		});
	}

	createProgramFormGroup: FormGroup = this.formBuilder.group({
		name: new FormControl(),
		price: new FormControl(),
		description: new FormControl(),
		details: new FormControl(),
	});

	createProgram() {
		console.log("Create form", this.createProgramFormGroup.value);
		
	}


	toggleCreateForm() {
		this.shouldShowCreateForm = !this.shouldShowCreateForm;
	}

}
