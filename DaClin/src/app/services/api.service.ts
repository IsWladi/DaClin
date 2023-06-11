import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  // probar usar HttpClient para obtener datos de un JSON
  // getRecordatorios() {
  //   return this.http.get('assets/files/recordatorios.json').pipe(map((res: any) => {
  //       return res.data;
  //   }))
  // }
  // probar usar HttpClient para obtener datos de una API simple
  getUsuarios() {
    return this.http.get('http://localhost:8000/api/users').pipe(
      map((res: any) => {
        return res; // Retorna la respuesta JSON completa
      })
    );
  }

  getRemedios(): import("../model/remedios").Remedio[] {
    return [
            {
              remedio: "Paracetamol",
              motivo: "Dolor de cabeza",
              cantidad: 1,
              frecuencia_horas: 8,
              periodo_dias: 1,
              inicio: "2023-06-03",
              hora: "09:00",
              comentario: "Tomar con comida",
            },
            {
              remedio: "Ibuprofeno",
              motivo: "Dolor muscular",
              cantidad: 2,
              frecuencia_horas: 6,
              periodo_dias: 2,
              inicio: "2023-06-03",
              hora: "12:00",
              comentario: "No exceder la dosis diaria",
            },
            {
              remedio: "Omeprazol",
              motivo: "Acidez estomacal",
              cantidad: 1,
              frecuencia_horas: 24,
              periodo_dias: 1,
              inicio: "2023-06-03",
              hora: "20:00",
              comentario: "Tomar antes de dormir",
            },
]
  }
  getCitas(): import("../model/citas").Cita[] {
    return [
      {
        "especialidad": "dentista",
        "fecha": "2023-07-10",
        "hora": "10:00",
        "motivo": "limpieza preventiva"
      },
      {
        "especialidad": "cardiólogo",
        "fecha": "2023-07-12",
        "hora": "15:30",
        "motivo": "consulta de seguimiento"
      },
      {
        "especialidad": "oftalmólogo",
        "fecha": "2023-07-15",
        "hora": "09:45",
        "motivo": "examen de la vista"
      },
      {
        "especialidad": "ginecólogo",
        "fecha": "2023-07-18",
        "hora": "11:15",
        "motivo": "chequeo anual"
      },
      {
        "especialidad": "dermatólogo",
        "fecha": "2023-07-22",
        "hora": "14:00",
        "motivo": "revisión de lunares"
      },
      {
        "especialidad": "traumatólogo",
        "fecha": "2023-07-25",
        "hora": "16:30",
        "motivo": "evaluación de lesión en la rodilla"
      },
      {
        "especialidad": "pediatra",
        "fecha": "2023-07-26",
        "hora": "08:45",
        "motivo": "vacunación y control de crecimiento"
      },
      {
        "especialidad": "psicólogo",
        "fecha": "2023-07-28",
        "hora": "17:00",
        "motivo": "terapia individual"
      },
      {
        "especialidad": "endocrinólogo",
        "fecha": "2023-07-30",
        "hora": "12:30",
        "motivo": "ajuste de medicación"
      },
      {
        "especialidad": "neurólogo",
        "fecha": "2023-08-02",
        "hora": "10:30",
        "motivo": "evaluación de síntomas neurológicos"
      }
    ]

  }
  getUsers(): import("../model/users").User[] {
    return [
            {
              "username": "dev",
              "password": "123",
            },
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
}
