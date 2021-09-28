import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';

  constructor( 
    private http: HttpClient,
    private router: Router
    ) { }

  registerUser(user){
    return this.http.post<any>(this.URL + '/register', user);
  }
  signInUser(user){
    return this.http.post<any>(this.URL + '/signin', user);
  }
  loggedIn(){
    return !!localStorage.getItem('token'); //Comprovar si el token existeix o no. Retorna un boolean.
  }
  getToken() {
    return localStorage.getItem('token');
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
  }
}
