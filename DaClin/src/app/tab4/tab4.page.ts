import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/autenticacion/auth.service';
import {CamaraManageService} from '../services/tabs/tab4/camara-manage.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {format, parseISO} from 'date-fns';


import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

const IMAGE_DIR = "daclin_stored_images"

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
  images: LocalFile[] = [];
  imageLoaded: boolean = false;
  imagePath: string = '';
  formularioExamen: FormGroup;
  isNewForm: boolean = false;
  regex = '[a-zA-Z0-9 ]{4,}';
  especialidadRegex = '[a-zA-Z ]{4,}';
  // para fecha
  formattedDate: string = '';

  constructor(public camaraManage: CamaraManageService,public authService: AuthService, public fb: FormBuilder, private alertController: AlertController) {

    this.formularioExamen = this.fb.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      razon: new FormControl('', [ Validators.required, Validators.pattern(this.regex) ])
    });
    this.setToday();
  }

  async seleccionarImagen(){
    this.imagePath = await this.camaraManage.selectImage();
  }


  async guardarExamen(){
    let examenForm = this.getExamenForm();
    if(examenForm != false){
      let response = this.camaraManage.guardarExamen(examenForm["nombre"], examenForm["razon"], examenForm["fecha"], examenForm["imagen"]);
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
    if (isValid) {
      return true;
    } else {
      return false;
    }
  }

  getExamenForm() {
    let nombre = this.formularioExamen.get('nombre');
    let razon = this.formularioExamen.get('razon');
    let fecha = this.formattedDate;
    let imagen = "";
    if (this.imagePath != ""){
      imagen = this.imagePath;
    }

    if (nombre?.invalid || razon?.invalid) {
      return false;
    } else {
      return {
        "nombre":nombre?.value,
        "razon":razon?.value,
        "fecha":fecha,
        "imagen":imagen
      };
    }
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
    this.images = await this.camaraManage.loadFiles();
  }

}
