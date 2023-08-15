import { RouterModule, Routes } from "@angular/router";
import { WorkoutProgramsListComponent } from "./workout-programs-list/workout-programs-list.component";
import { WorkoutProgramReviewPageComponent } from "./workout-program-review-page/workout-program-review-page.component";

const routes: Routes = [
    {
        path: 'workout-programs',
        component: WorkoutProgramsListComponent,
    },
    {
        path: 'workout-programs/:programId',
        component: WorkoutProgramReviewPageComponent,
    },
];

export const WorkoutProgramsRoutingModule = RouterModule.forChild(routes);