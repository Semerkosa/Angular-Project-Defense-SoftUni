export interface ICreateUserDto {
    email: string;
    firstName: string;
    lastName?: string;
    password: string;
}