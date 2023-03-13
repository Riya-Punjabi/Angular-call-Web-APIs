import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://192.168.0.213:5019/api/employeelogin/employeelogin';

  constructor(private http: HttpClient) { }

  login(employee : any): Observable<any> {
    
    return this.http.post<any>(this.apiUrl, employee);
  }
}
