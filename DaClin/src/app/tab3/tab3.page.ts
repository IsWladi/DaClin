import { Component, OnInit } from '@angular/core';
import { PagesEndpointsService } from '../services/tabs/pages-endpoints.service';
import { AuthService } from '../services/autenticacion/auth.service';

import { Remedio } from '../model/remedios';

import { AlertController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  remedios: Remedio[] = [];
  isExpanded: boolean[] = [];
  formularioRemedio: FormGroup;
  motivoRegex = '[a-zA-Z0-9 ]{4,}';
  especialidadRegex = '[a-zA-Z ]{4,}';
  numerosRegex = '[0-9]{1,}';
  cantidadRegex = '^\\d+(?:mg|g|mcg|ml|L|u)$';
  duranteRegex = '^(?:\\d+\\s(?:dias|meses|años)|indefinido)$';

  alertMessage: string = '';
  public alertButtons = ['OK'];
  showAlert = false; // Variable booleana para controlar la visibilidad de la alerta

  constructor(private alertController: AlertController,private apiService: PagesEndpointsService, public authService: AuthService,public fb: FormBuilder) {
      // this.isExpanded = this.remedios.map(() => false);
    this.formularioRemedio = this.fb.group({
      motivo: new FormControl('', [
        Validators.required,
        Validators.pattern(this.motivoRegex),
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(this.motivoRegex),
      ]),
      cantidad: new FormControl('', [ Validators.required, Validators.pattern(this.cantidadRegex) ]),
      cada: new FormControl('', [ Validators.required, Validators.pattern(this.numerosRegex) ]),
      durante: new FormControl('', [ Validators.required, Validators.pattern(this.duranteRegex) ]),
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


  getRemedioForm() {
    let motivo = this.formularioRemedio.get('motivo');
    let nombre = this.formularioRemedio.get('nombre');
    let cantidad = this.formularioRemedio.get('cantidad');
    let cada = this.formularioRemedio.get('cada');
    let durante = this.formularioRemedio.get('durante');
    let fecha = this.formularioRemedio.get('fecha');

    if (motivo?.invalid || nombre?.invalid || cantidad?.invalid || cada?.invalid || durante?.invalid || fecha?.invalid) {
      return false;
    } else {
      return {
        "motivo":motivo?.value,
        "nombre":nombre?.value,
        "cantidad":cantidad?.value,
        "cada":cada?.value,
        "durante":durante?.value,
        "fecha":fecha?.value
      };
    }
  }

  //form

  // para habilitar o desabilitar boton del formulario
  isValidForm() {
    let isValid = this.formularioRemedio.valid;
    if (isValid) {
      return true;
    } else {
      return false;
    }
  }


  limpiarForm(){
    this.formularioRemedio.get('motivo')?.reset();
    this.formularioRemedio.get('nombre')?.reset();
    this.formularioRemedio.get('cantidad')?.reset();
    this.formularioRemedio.get('cada')?.reset();
    this.formularioRemedio.get('durante')?.reset();
    this.formularioRemedio.get('fecha')?.reset();
  }


  async guardarRemedio(){
    let citaForm = this.getRemedioForm();
    if(citaForm != false){
      let response = await this.apiService.crearRemedio(citaForm["motivo"],citaForm["nombre"],citaForm["cantidad"],citaForm["cada"],citaForm["durante"],citaForm["fecha"]);
      if(response == 1){
        this.alertMessage = 'Remedio creado exitosamente';
        this.showAlert = true; // Actualiza la variable para mostrar la alerta
        this.presentAlert(); // Llama al método para mostrar la alerta
        this.limpiarForm();
        // this.ionViewDidEnter(); // actualizar lista
      }
      else if(response == 0){
        this.alertMessage = 'Remedio no creado, el remedio debe ser unico';
        this.showAlert = true; // Actualiza la variable para mostrar la alerta
        this.presentAlert(); // Llama al método para mostrar la alerta
      }
      else if(response == 404){
        this.alertMessage = 'debe iniciar sesion para crear un remedio';
        this.showAlert = true; // Actualiza la variable para mostrar la alerta
        this.presentAlert(); // Llama al método para mostrar la alerta
      }
    }

  }

  // toggleExpand(index: number) {
  //   this.isExpanded[index] = !this.isExpanded[index];
  // }

  // ionViewDidEnter() {
    // this.remedios = this.apiService.getRemedios();
    // hacer que this.remedios[i].nombre sea la primera letra en mayúscula
    // this.remedios.forEach(remedio => {
    //   remedio.remedio = remedio.remedio[0].toUpperCase() + remedio.remedio.slice(1);
    // });
  // }


  // onIonInfinite(ev: any) {
  //   this.remedios;
  //   setTimeout(() => {
  //     (ev as InfiniteScrollCustomEvent).target.complete();
  //   }, 500);
  // }

}
