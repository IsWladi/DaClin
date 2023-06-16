import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
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
  citas: Cita[] = [];
  isExpanded: boolean[] = [];
  formularioCita: FormGroup;
  motivoRegex = '[a-zA-Z0-9 ]{4,}';
  especialidadRegex = '[a-zA-Z ]{4,}';

  alertMessage: string = '';
  public alertButtons = ['OK'];
  showAlert = false; // Variable booleana para controlar la visibilidad de la alerta

  constructor(public apiService: ApiService, public fb: FormBuilder, private alertController: AlertController) {
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
      }
      else{
        this.alertMessage = 'Cita no creada, el motivo debe ser unico';
        this.showAlert = true; // Actualiza la variable para mostrar la alerta
        this.presentAlert(); // Llama al método para mostrar la alerta
      }
    }

  }

  toggleExpand(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  ionViewDidEnter() {
    this.citas = this.apiService.getCitas();
    // hacer que this.citas[i].motivo sea la primera letra en mayúscula
    this.citas.forEach(cita => {
      cita.motivo = cita.motivo[0].toUpperCase() + cita.motivo.slice(1);
      cita.especialidad = cita.especialidad[0].toUpperCase() + cita.especialidad.slice(1);
    });

  }


  onIonInfinite(ev: any) {
    this.citas;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
