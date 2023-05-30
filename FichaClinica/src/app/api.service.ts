import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getUsers(): import("./model/users").User[] {
    return [
            {
              "username": "Juan",
              "password": "123456",
            },{
              "username": "Luis",
              "password": "hola123",
            },{
              "username": "Juano",
              "password": "hola"
            },{
              "username": "admin",
              "password": "duoc123456",
            },{
              "username": "Luisa",
              "password": "hola1234"
            },{
              "username": "Juanito",
              "password": "salalala"
            }
    ]
  }

  constructor() { }
}
