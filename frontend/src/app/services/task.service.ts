import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_URL = 'http://localhost:4000/api/tasks';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL, { headers: this.getAuthHeaders() });
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API_URL, task, { headers: this.getAuthHeaders() });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}/${task._id}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, { headers: this.getAuthHeaders() });
  }
}