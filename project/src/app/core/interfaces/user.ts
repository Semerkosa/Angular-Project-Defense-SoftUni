import { IBase } from "./base";
import { ICoach } from "./coach";
import { IWorkoutProgram } from "./workout-program";

export interface IUser extends IBase {
    email: string;
    password: string;
    purchasedWorkoutPrograms: IWorkoutProgram[];
    coach: ICoach;
    // isAdmin: boolean; // Admin should be able to add more workout programs and coaches and/or edit their descriptions
}