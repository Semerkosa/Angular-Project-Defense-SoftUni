import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateProgram, IWorkoutProgram } from '../interfaces';

const serverUrl = `${environment.apiUrl}/workout-programs`;

@Injectable({
  providedIn: 'root'
})
export class WorkoutProgramService {

  constructor(private http: HttpClient) { }

  getWorkoutPrograms$(): Observable<IWorkoutProgram[]> {
    return this.http.get<IWorkoutProgram[]>(serverUrl);
  } 

  getWorkoutProgramById$(id: number): Observable<IWorkoutProgram> {
    return this.http.get<IWorkoutProgram>(`${serverUrl}/${id}`)
  }

  editUsersForGivenWorkoutProgram$(workoutProgramId: number, userIds: number[]): Observable<IWorkoutProgram> {
		const body = {
			"customers": userIds ? userIds : []
		}
    
		return this.http.patch<IWorkoutProgram>(`${serverUrl}/${workoutProgramId}`, body, environment.httpOptions);
	}

  createWorkoutProgram$(program: ICreateProgram): Observable<IWorkoutProgram> {
    return this.http.post<IWorkoutProgram>(`${serverUrl}`, program, environment.httpOptions);
  }
}
