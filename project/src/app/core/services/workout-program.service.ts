import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWorkoutProgram } from '../interfaces';

const serviceUrl = `${environment.apiUrl}/workout-programs`;

@Injectable({
  providedIn: 'root'
})
export class WorkoutProgramService {

  constructor(private http: HttpClient) { }

  getWorkoutPrograms$(): Observable<IWorkoutProgram[]> {
    return this.http.get<IWorkoutProgram[]>(serviceUrl);
  } 

  getWorkoutProgramById$(id: number): Observable<IWorkoutProgram> {
    return this.http.get<IWorkoutProgram>(`${serviceUrl}/${id}`)
  }
}
