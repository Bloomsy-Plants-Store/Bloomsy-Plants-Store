import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:7400/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', { email, password }, {
      ...httpOptions,
      observe: 'response'
    });
  }


  register(name: string, email: string, phone:string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      name,
      email,
      phone,
      password
    },{
    ...httpOptions,
    observe: 'response'});
  }
}
