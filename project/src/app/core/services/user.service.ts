import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateUserDto, ILoginUserDto } from '../interfaces';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  updateLoginStatus(status: boolean) {
    this.isAuthenticatedSubject.next(status);
  }

  isLoggedIn() {
    return !!localStorage.getItem("token"); // to retrieve boolean
  }

  getUserFullName() {
    return localStorage.getItem("fullName");
  }

  login$(user: ILoginUserDto) {
    const url = `${environment.apiUrl}/login`;
    return this.http.post<any>(url, user, httpOptions);
  }

  register$(user: ICreateUserDto): Observable<any> {
    const url = `${environment.apiUrl}/register`;
    return this.http.post<ICreateUserDto>(url, user, httpOptions);
  }

  logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("fullName");
    localStorage.removeItem("token");

    this.updateLoginStatus(false);
  }
}
