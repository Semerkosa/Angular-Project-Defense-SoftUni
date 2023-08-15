import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
	AbstractControl,
	ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ICreateUserDto, IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	errorMessage = '';

	registerFormGroup: FormGroup = this.formBuilder.group({
		email: new FormControl(null, [Validators.required, this.emailValidator]),
		firstName: new FormControl(null, [
			Validators.required,
			Validators.minLength(2),
		]),
		lastName: new FormControl(),
		password: new FormControl(null, [
			Validators.required,
			this.passwordValidator,
		]),
	});

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private router: Router
	) { }

	ngOnInit(): void { }

	onSubmit(): void {
		console.log('Register form values:');
		console.log(this.registerFormGroup);
		const { email, firstName, lastName, password } =
			this.registerFormGroup.value;

		const body: ICreateUserDto = {
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: password,
		};

		this.userService.register$(body)
			.pipe(
				map(response => {
					console.log('Registered user response:');
					console.log(response);

					localStorage.setItem('id', response.user.id);
					localStorage.setItem('email', response.user.email);
				}),
				switchMap(() => {
					return this.router.navigate([`/workout-programs`]);
				})
			)
			.subscribe({
				next(isNavigated) {
					console.log(`Navigated successfully (${isNavigated})`);
				},
				error(msg) {
					console.log("Error upon registration");
					alert(msg.error);
				}
			}
			);
	}

	navigate(destination: string) {
		this.router.navigate([destination]);
	}

	shouldShowErrorForControl(
		controlName: string,
		sourceGroup: FormGroup = this.registerFormGroup
	) {
		return (
			sourceGroup.controls[controlName].touched &&
			sourceGroup.controls[controlName].invalid
		);
	}

	emailValidator(control: AbstractControl): ValidationErrors | null {
		const value = control.value;
		console.log('Validating email - ' + value);

		if (!value) {
			return null;
		}

		if (!/.{5,}@(gmail|abv)\.(com|bg)/.test(value)) {
			// pesho@abv.bg, ivan_ivanov@gmail.com
			return {
				email: true,
			};
		}

		return null;
	}

	passwordValidator(control: AbstractControl): ValidationErrors | null {
		const value = control.value;
		console.log('Validating password - ' + value);

		if (!value) {
			return null;
		}

		if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)) {
			// Strongpass123
			return {
				password: true,
			};
		}

		return null;
	}
}
