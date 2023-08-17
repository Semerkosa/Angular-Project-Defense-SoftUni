import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

	constructor(
		private workoutProgramService: WorkoutProgramService,
		private userService: UserService,
		private router: Router) { }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnInit(): void {
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

	purchaseProgram(event: Event, program: IWorkoutProgram) {
		if (!this.userService.isLoggedIn()) {
			alert("To buy a program, please login.")
			this.router.navigate(['/login']);
			return;
		}

		const btn = event.target as HTMLElement;
		const userId = +this.userService.getUserId(); // cast the id to number

		this.userService.getUserById$(userId).subscribe({
			next: user => {
				console.log("User by id is", user);

				let userPrograms = user.purchasedWorkoutPrograms;
				let canPurchase = true;

				for (let p of userPrograms) {
					if (p.id === program.id) {
						canPurchase = false;
						break;
					}
				}

				if (canPurchase) {
					userPrograms.push(program);
					console.log('New list with programs', userPrograms);
					
					this.userService.editUserWorkoutPrograms$(userId, userPrograms).subscribe({
						next: editedUser => {
							console.log("Edited user is ", editedUser);
							
						},
						error: err => {
							console.log(err);
							
						}
					});

					btn.textContent = 'Purchased';
				} else {
					btn.textContent = 'Already owned';
				}

				btn.style.backgroundColor = 'darkGreen';
				btn.style.color = 'white';
				btn.setAttribute('disabled', '');
			},
			error: err => {
				console.log(err);
			}
		});
	}

}
