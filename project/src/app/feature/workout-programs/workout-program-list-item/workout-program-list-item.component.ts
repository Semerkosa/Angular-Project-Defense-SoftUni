import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IWorkoutProgram } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { WorkoutProgramService } from 'src/app/core/services/workout-program.service';

@Component({
    selector: 'app-workout-program-list-item',
    templateUrl: './workout-program-list-item.component.html',
    styleUrls: ['./workout-program-list-item.component.scss']
})
export class WorkoutProgramListItemComponent implements OnChanges {

    canPurchase = true;

    constructor(
        private userService: UserService,
        private workoutProgramService: WorkoutProgramService,
        private router: Router) { }


    @Input() program: IWorkoutProgram;

    ngOnChanges(): void {
        const userId = this.userService.getUserId();

        if (userId) {
            this.canPurchase = !this.program.customers.includes(+userId); // if id is included - we return false
        }
    }

    purchaseProgram(event: Event, program: IWorkoutProgram) {
        if (!this.userService.isLoggedIn()) {
            alert("To buy a program, please login.")
            this.router.navigate(['/login']);
            return;
        }

        const btn = event.target as HTMLElement;
        const programId = +program.id;
        const userId = +this.userService.getUserId(); // cast the id to number

        this.userService.getUserById$(userId).subscribe({
            next: user => {
                console.log("User by id is", user);

                let userPrograms = user.purchasedWorkoutPrograms;

                userPrograms.push(program);
                console.log('New list with programs', userPrograms);

                this.userService.editWorkoutProgramsForGivenUser$(userId, userPrograms).subscribe({
                    next: editedUser => {
                        console.log("Edited user is ", editedUser);

                    },
                    error: err => {
                        console.log(err);

                    }
                });

                let workoutProgramCustomers = program.customers;
                
                workoutProgramCustomers.push(user.id);
                console.log('New list with customers', workoutProgramCustomers);

                this.workoutProgramService.editUsersForGivenWorkoutProgram$(programId, workoutProgramCustomers).subscribe({
                    next: editedProgram => {
                        console.log("Edited program is ", editedProgram);

                    },
                    error: err => {
                        console.log(err);
                    }
                });

                btn.textContent = 'Purchased';

                btn.style.backgroundColor = 'darkGreen';
                btn.style.color = 'white';
                btn.setAttribute('disabled', '');
            },
            error: err => {
                console.log(err);
                alert("Something went wrong. Please re-login.")
            }
        });
    }
}
