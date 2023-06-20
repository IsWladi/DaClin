import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AuthService } from '../autenticacion//auth.service';
import { map } from 'rxjs/operators';
import { Cita } from '../../model/citas';

@Injectable({
  providedIn: 'root'
})
export class PagesEndpointsService {

  constructor(private http: HttpClient, private auth:AuthService) { }

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
      if (response == 0){
        return 0; // usuario no encontrado
      }

      // Transformar los datos de respuesta en objetos Cita
      let citas: Cita[] = response.map((item: any) => {
        return {
          especialidad: item.especialidad,
          fecha:item.fecha,
          motivo: item.motivo
        };
      });

      return citas;
    } catch (error) {
      console.error('Error al obtener citas:', error);
      throw error;
    }
  }
}
