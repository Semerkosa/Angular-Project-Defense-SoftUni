import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateUserDto, IUser } from '../interfaces';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {}

  login(user: IUser) {
    const url = `${environment.apiUrl}/login`;
    return this.http.post<any>(url, user, httpOptions);
  }

  register(user: ICreateUserDto): Observable<any> {
    const url = `${environment.apiUrl}/register`;
    return this.http.post<ICreateUserDto>(url, user, httpOptions);
  }

  logout() {
    localStorage.clear;
    this.router.navigate(["/login"]);
  }
}
