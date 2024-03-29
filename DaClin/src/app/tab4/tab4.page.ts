import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/autenticacion/auth.service';
import {CamaraManageService} from '../services/tabs/tab4/camara-manage.service';
import { PagesEndpointsService } from '../services/tabs/pages-endpoints.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {format, parseISO} from 'date-fns';
import { Examen } from 'src/app/model/examenes';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

interface LocalFile{
  name: string,
  path: string,
  data: string,
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  formularioExamen: FormGroup;
  isNewForm: boolean = false;
  regex = '[a-zA-Z0-9 ]{4,}';
  especialidadRegex = '[a-zA-Z ]{4,}';
  // para fecha
  formattedDate: string = '';

  image: any = "";
  examenes: any = [];

  alertMessage: string = '';
  public alertButtons = ['OK'];
  showAlert = false; // Variable booleana para controlar la visibilidad de la alerta

  constructor(public apiService:PagesEndpointsService,public camaraManage: CamaraManageService,public authService: AuthService, public fb: FormBuilder, private alertController: AlertController) {
    this.formularioExamen = this.fb.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      razon: new FormControl('', [ Validators.required, Validators.pattern(this.regex) ])
    });
    this.setToday();

  }

   async ionViewDidEnter() {
     this.resetForm(); // ocultar formulario
     this.examenes = this.apiService.examenes;
     this.examenes = await this.apiService.getExamenes();

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

  async seleccionarImagen(){
    this.image = await this.camaraManage.selectImage();
  }


  async guardarExamen(){
    let examenForm = await this.getExamenForm();
    let response = await this.camaraManage.guardarExamen(examenForm["nombre"], examenForm["razon"], examenForm["fecha"], examenForm["imagen"]);
    let artificialAdd:Examen = {
      nombre: examenForm["nombre"],
      razon: examenForm["razon"],
      fecha: examenForm["fecha"],
      imagen: examenForm["imagen"]
    }
    if(response!=false){
      this.alertMessage = 'Examen creado exitosamente';
      this.showAlert = true; // Actualiza la variable para mostrar la alerta
      this.presentAlert(); // Llama al método para mostrar la alerta
      this.limpiarForm();
      this.resetForm();
      //se agregan los datos a la lista de examenes de manera manual para actualizar la vista
      if (!Array.isArray(this.examenes)) {
        this.examenes = []; // Inicializa _this4.examenes como un array vacío si no lo es
      }
      this.examenes.push(artificialAdd); // para actualizar la lista de examenes en la vista
    }
  }

  // para habilitar o desabilitar boton del formulario
  createForm(){
    this.isNewForm = true;
  }
  resetForm(){
    this.isNewForm = false;
  }

  isValidForm() {
    let isValid = this.formularioExamen.valid;
    if (isValid && this.image != "") {
      return true;
    } else {
      return false;
    }
  }

  async getExamenForm() {
    let nombre = this.formularioExamen.get('nombre');
    let razon = this.formularioExamen.get('razon');
    let fecha = this.formattedDate;
    let imagen = await this.camaraManage.getImage(this.image);
    return {
      "nombre":nombre?.value,
      "razon":razon?.value,
      "fecha":fecha,
      "imagen":imagen
    };
    }

  limpiarForm(){
    this.formularioExamen.get('nombre')?.reset();
    this.formularioExamen.get('razon')?.reset();
    this.setToday();
    this.resetForm();
  }


  setToday(){
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm');
    this.formattedDate = format(parseISO(formattedDate), 'yyyy-MM-dd HH:mm');

  }

  dateChanged(date:any){
    this.formattedDate = format(parseISO(date), 'yyyy-MM-dd HH:mm');
  }

  async ngOnInit() {
  }

  onIonInfinite(ev: any) {
    this.examenes;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
