import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateUserDto, IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	errorMessage = '';

	registerFormGroup: FormGroup = this.formBuilder.group({
		'email': new FormControl(null, [Validators.required, this.emailValidator]),
		'first-name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
		'last-name': new FormControl,
		'password': new FormControl(null, [Validators.required, this.passwordValidator])
	});

	constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

	ngOnInit(): void {
	}

	handleRegister(): void {
		console.log("Register form values:");
		console.log(this.registerFormGroup.value);
		const { email, firstName, lastName, password } = this.registerFormGroup.value;

		const body: ICreateUserDto = {
			email: "pesaaho@abv.bg",
			firstName: "firastName",
			lastName: "lasatName",
			password: "passaword",
		}

		this.userService.register(body).subscribe((response) => {
			// this.accessToken = response.accessToken;
			//this.user = response.user;

			console.log("HTTP register response:");
			console.log(response);

			localStorage.setItem("id", response.user.id);
			localStorage.setItem("email", response.user.email);
			// localStorage.setItem("isAdmin", response.isAdmin);
			// localStorage.setItem("token", response);

			console.log(localStorage.getItem('user'))

			alert("Successfully registered!");
		}
		);
	}

	shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
		return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid
	}

	emailValidator(control: AbstractControl): ValidationErrors | null {
		const value = control.value;
		console.log("Validating email - " + value);

		if (!value) {
			return null;
		}

		if (/.{5,}@(gmail|abv)\.(com|bg)/.test(value)) { // pesho@abv.bg, ivan_ivanov@gmail.com
			return {
				email: true,
			}
		}

		return null;
	}

	passwordValidator(control: AbstractControl): ValidationErrors | null {
		const value = control.value;
		console.log("Validating password - " + value);

		if (!value) {
			return null;
		}

		if (/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)) { // Strongpass123
			return {
				email: true,
			}
		}

		return null;
	}

}
