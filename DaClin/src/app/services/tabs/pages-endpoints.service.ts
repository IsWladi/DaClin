import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AuthService } from '../autenticacion/auth.service';
import { map } from 'rxjs/operators';
import { Cita } from '../../model/citas';
import { Remedio } from 'src/app/model/remedios';
import { Examen } from 'src/app/model/examenes';
import { Router } from '@angular/router';
// import environment
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesEndpointsService {
  examenes: any = []; // Array de examenes actuales del usuario, se maneja desde la vista
  remedios: any = []; // Array de remedios actuales del usuario, se maneja desde la vista
  citas: any = []; // Array de citas actuales del usuario, se maneja desde la vista

  constructor(private http: HttpClient, public auth:AuthService, private router:Router) { }

  closeSesion(testing: boolean = false){
    this.auth.userId = ""
    localStorage.removeItem('userId');
    this.resetData();
    if (!testing) {
      this.router.navigate(['/login']);
    }
  }

  resetData() {
    this.examenes = [];
    this.remedios = [];
    this.citas = [];
  }

  async crearExamen(examenData: any) {
    let response:any = {};
    let user = this.auth.getUserId();
    if (user == "") {
      return 404;
    }
    const url = this.auth.endPointBase+'api/examenes/agregar/'+user;

    const body = {
      nombre: examenData.nombre,
      razon: examenData.razon,
      fecha: examenData.fecha,
      imagen: examenData.imagen
    };

    try {
      response = await this.http.post(url, body).toPromise();
      if (response["message"] == "Examen no creado, razon debe ser unico" ){
        return 0;
      }
      return 1;
    } catch (error) {
      console.error('Error al crear nuevo examen:', error);
      throw error;
    }
  }

  async getExamenes() {
    let response:any = {};
    let user = this.auth.getUserId();
    if (user == "") {
      return 404;
    }
    const url = this.auth.endPointBase+'api/examenes/usuario/'+user;

    try {
      response = await this.http.get(url).toPromise();
      if ( Object.keys(response).length !== 0){
        // Transformar los datos de respuesta en objetos Examen
        let examenes: Examen[] = response.map((item: any) => {
          return {
            nombre: item.nombre,
            razon: item.razon,
            fecha: item.fecha,
            imagen: item.imagen
          };
        });
        this.examenes = examenes;
        return examenes;
      }
      return 0;

    } catch (error) {
      console.error('Error al obtener examenes:', error);
      throw error;
    }
  }

  async crearCita(motivo: string, especialidad: string, fecha: string) {
    let response:any = {};
    let user = this.auth.getUserId();
    if (user == "") {
      return 404;
    }
    const url = this.auth.endPointBase+'api/citas/agregar/'+user;

    const body = {
      motivo: motivo,
      especialidad: especialidad,
      fecha: fecha
    };

    try {
      response = await this.http.post(url, body).toPromise();
      if (response["message"] == "Cita no creada, motivo debe ser unico" ){
        return 0;
      }
      return 1;
    } catch (error) {
      console.error('Error al crear nueva cita:', error);
      throw error;
    }
  }

  async getCitas() {
    let response:any = {};
    let user = this.auth.getUserId();
    if (user == "") {
      return 404;
    }
    const url = this.auth.endPointBase+'api/citas/usuario/'+user;

    try {
      response = await this.http.get(url).toPromise();
      if ( Object.keys(response).length !== 0){
        // Transformar los datos de respuesta en objetos Cita
        let citas: Cita[] = response.map((item: any) => {
          return {
            especialidad: item.especialidad,
            fecha:item.fecha,
            motivo: item.motivo
          };
        });
        this.citas = citas;
        return citas;
      }
      return 0;

    } catch (error) {
      console.error('Error al obtener citas:', error);
      throw error;
    }
  }

  async crearRemedio(motivo: string, nombre: string, cantidad: string, cada: string, durante:string, fecha: string) {
    let response:any = {};
    let user = this.auth.getUserId();
    if (user == "") {
      return 404;
    }
    const url = this.auth.endPointBase+'api/remedios/agregar/'+user;
    cada = cada + " horas";
    const body = {
      motivo: motivo,
      nombre: nombre,
      cantidad: cantidad,
      cada: cada,
      durante: durante,
      fecha: fecha
    };

    try {
      response = await this.http.post(url, body).toPromise();
      if (response["message"] == "Remedio no creado, remedio debe ser unico" ){
        return 0;
      }
      return 1;
    } catch (error) {
      console.error('Error al crear nuevo remedio:', error);
      throw error;
    }
  }


  async getRemedios() {
    let response:any = {};
    let user = this.auth.getUserId();
    if (user == "") {
      return 404;
    }
    const url = this.auth.endPointBase+'api/remedios/usuario/'+user;
    try {
      response = await this.http.get(url).toPromise();
      if (response == 0){
        return 0; // usuario no encontrado
      }

      // Transformar los datos de respuesta en objetos Remedio
      let remedios: Remedio[] = response.map((item: any) => {
        return {
          motivo: item.motivo,
          nombre: item.nombre,
          cantidad: item.cantidad,
          cada: item.cada,
          durante: item.durante,
          fecha: item.fecha
        };
      });
      this.remedios = remedios;
      return remedios;
    } catch (error) {
      console.error('Error al obtener remedios:', error);
      throw error;
    }
  }

}
