import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: any = ""; // para acceder desde cualquier page al id del usuario logeado y usarlo para endpoints
  endPointBase = "https://daclinapi-1-f4557501.deta.app/"

  constructor(private http: HttpClient, private router:Router) { }

  // registrar usuario
  async registrarUsuario(usuario: string, contrasena: string) {
    const url = this.endPointBase+'api/users/register/';

    const body = {
      username: usuario,
      password: contrasena
    };

    try {
      const response = await this.http.post(url, body).toPromise();
      this.userId = response;
      return response;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error; // Lanza una excepción para manejar el error en la función `register()`
    }
  }
// login usuario
async loginUsuario(usuario: string, contrasena: string, saveConnection: boolean) {
  const url = this.endPointBase+'api/users/login/';

  const body = {
    username: usuario,
    password: contrasena
  };

  try {
    const response = await this.http.post(url, body).toPromise();
    if (response !== undefined) {
      if (saveConnection) {
        localStorage.setItem('userId', response.toString());
      }
      else{
        this.userId = response.toString();
      }
    } else {
      // Lógica para manejar el caso en que la respuesta sea undefined
      this.userId = '';
    }
    return response; // Devuelve la respuesta obtenida desde el backend
  } catch (error) {
    console.error('Error al loguear usuario:', error);
    throw error; // Relanza el error para manejarlo en la función `login()`
  }
}

  closeSesion(){
    this.userId = ""
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }

  isLoggedIn(){
    if (this.userId == "" && localStorage.getItem('userId') == null ){
      return false
    }
    return true
  }

  getUserId(){
    if (this.userId != ""){
      return this.userId
    }
    else if (localStorage.getItem('userId') != null){
      return localStorage.getItem('userId')}
    else{
      return ""}
  }
}
