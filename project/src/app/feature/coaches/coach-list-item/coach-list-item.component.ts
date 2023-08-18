import { Component, Input, OnInit } from '@angular/core';
import { ICoach } from 'src/app/core/interfaces';
import { CoachService } from 'src/app/core/services/coach.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-coach-list-item',
    templateUrl: './coach-list-item.component.html',
    styleUrls: ['./coach-list-item.component.scss']
})
export class CoachListItemComponent implements OnInit {

    canHire = true;

    @Input() coach: ICoach;

    constructor(
        private coachService: CoachService,
        private userService: UserService) { }

    ngOnInit(): void {
        const userId = +this.userService.getUserId();

        this.canHire = !this.coach.clients.includes(userId); // if the user is within the clients of the coach, we can't hire him again
    }

    hireCoach(event: Event, coach: ICoach) {
        console.log(coach);

        const btn = event.target as HTMLElement;
        const coachId = coach.id;
        const userId = +this.userService.getUserId();

        this.userService.editCoachForGivenUser$(userId, coach).subscribe({
            next: editedUser => {
                console.log("Edited user", editedUser);
            },
            error: err => {
                console.log(err);
            }
        });

        let coachClients = coach.clients;
        coachClients.push(userId);

        this.coachService.editUsersForGivenCoach(coachId, coachClients).subscribe({
            next: editedCoach => {
                console.log("Edited coach", editedCoach);
            },
            error: err => {
                console.log(err);
            }
        });

        btn.textContent = 'Hired!';
        btn.style.backgroundColor = 'darkGreen';
        btn.style.color = 'white';
        btn.setAttribute('disabled', '');
    }
}
