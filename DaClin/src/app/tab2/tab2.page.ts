import { Component } from '@angular/core';
import { PagesEndpointsService } from '../services/tabs/pages-endpoints.service';
import { AuthService } from '../services/autenticacion/auth.service';
import { Cita } from '../model/citas';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
  citas: any = [];
  isExpanded: boolean[] = [];
  formularioCita: FormGroup;
  motivoRegex = '[a-zA-Z0-9 ]{4,}';
  especialidadRegex = '[a-zA-Z ]{4,}';

  alertMessage: string = '';
  public alertButtons = ['OK'];
  showAlert = false; // Variable booleana para controlar la visibilidad de la alerta

  constructor(public auth:AuthService,private apiService:PagesEndpointsService, public fb: FormBuilder, private alertController: AlertController) {
      this.isExpanded = this.citas.map(() => false);
    this.formularioCita = this.fb.group({
      motivo: new FormControl('', [
        Validators.required,
        Validators.pattern(this.motivoRegex),
      ]),
      especialidad: new FormControl('', [ Validators.required, Validators.pattern(this.especialidadRegex) ]),
      fecha: new FormControl('', Validators.required)
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'aviso',
      subHeader: '',
      message: this.alertMessage,
      buttons: ['OK'],
      cssClass: 'animate__animated animate__heartBeat', // agrega las clases de animate.css para animar la alerta
    });

    await alert.present();
  }

  // para habilitar o desabilitar boton del formulario
  isValidForm() {
    let isValid = this.formularioCita.valid;
    if (isValid) {
      return true;
    } else {
      return false;
    }
  }

  getCitaForm() {
    let motivo = this.formularioCita.get('motivo');
    let especialidad = this.formularioCita.get('especialidad');
    let fecha = this.formularioCita.get('fecha');

    if (motivo?.invalid || especialidad?.invalid || fecha?.invalid) {
      return false;
    } else {
      return {
        "motivo":motivo?.value,
        "especialidad":especialidad?.value,
        "fecha":fecha?.value
      };
    }
  }
  limpiarForm(){
    this.formularioCita.get('motivo')?.reset();
    this.formularioCita.get('especialidad')?.reset();
    this.formularioCita.get('fecha')?.reset();
  }

  async guardarCita(){
    let citaForm = this.getCitaForm();
    if(citaForm != false){
      let response = await this.apiService.crearCita(citaForm["motivo"],citaForm["especialidad"],citaForm["fecha"]);
      if(response == 1){
        this.alertMessage = 'Cita creada exitosamente';
        this.showAlert = true; // Actualiza la variable para mostrar la alerta
        this.presentAlert(); // Llama al método para mostrar la alerta
        this.limpiarForm();
        this.ionViewDidEnter(); // actualizar lista
      }
      else if(response == 0){
        this.alertMessage = 'Cita no creada, el motivo debe ser unico';
        this.showAlert = true; // Actualiza la variable para mostrar la alerta
        this.presentAlert(); // Llama al método para mostrar la alerta
      }
      else if(response == 404){
        this.alertMessage = 'debe iniciar sesion para crear una cita';
        this.showAlert = true; // Actualiza la variable para mostrar la alerta
        this.presentAlert(); // Llama al método para mostrar la alerta
      }
    }

  }

  toggleExpand(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }

   ionViewDidEnter() {
     this.apiService.getCitas()
     .then(citas => {
       this.citas = citas;
       // hacer que this.citas[i].motivo sea la primera letra en mayúscula
       if(this.citas != 0 && this.citas != 404){
         this.citas.forEach((cita:Cita) => {
           cita.motivo = cita.motivo[0].toUpperCase() + cita.motivo.slice(1);
           cita.especialidad = cita.especialidad[0].toUpperCase() + cita.especialidad.slice(1);
         });
         // formatear fecha
         this.citas.forEach((cita:Cita) => {
           cita.fecha = cita.fecha.slice(0,10) + ' ' + cita.fecha.slice(11,16);
         });
       }
       console.log(this.citas);
     })
     .catch(error => {
       console.error('Error al obtener citas:', error);
     });

  }


  onIonInfinite(ev: any) {
    this.citas;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
