import { IBase } from "./base";
import { ICoach } from "./coach";
import { IWorkoutProgram } from "./workout-program";

export interface IUser extends IBase {
    email: string;
    password: string;
    purchasedWorkoutPrograms: IWorkoutProgram[];
    hiredCoach: ICoach;
    isAdmin: boolean;
}