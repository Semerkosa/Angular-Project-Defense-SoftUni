import { IBase } from "./base";

export interface ICoach extends IBase {
    price: number; // monthly price
    reviews: string[];
}