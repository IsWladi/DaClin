import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { User } from '../model/users';
import { AlertController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuarios: any = []; // Variable para almacenar los usuarios registrados para comprobar si existe el usuario
  alertMessage: string = '';
  public alertButtons = ['OK'];
  showAlert = false; // Variable booleana para controlar la visibilidad de la alerta
  // formulario
  formularioRegister: FormGroup;
  usernameRegex = '[a-zA-Z1-9]{3,}';
  passwordRegex = '[a-zA-Z1-9\\W_]{6,}';

  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.formularioRegister = this.fb.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(this.usernameRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
      ]),
    });
  }

  isValidForm() {
    let isValid = this.formularioRegister.valid;
    if (isValid) {
      return true;
    } else {
      return false;
    }
  }
  errorNombre() {
    let username = this.formularioRegister.get('nombre');
    if (username?.invalid && username?.touched) {
      return true;
    } else {
      return false;
    }
  }

  errorPass1() {
    let pass = this.formularioRegister.get('password');
    if (pass?.invalid && pass?.touched) {
      return true;
    } else {
      return false;
    }
  }

  errorPass2() {
    let pass1 = this.formularioRegister.get('password')?.value;
    let pass2 = this.formularioRegister.get('password2')?.value;
    if (pass1 != pass2) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.usuarios = this.apiService.getUsers();
  }
  async register() {
    try {
      let username = this.formularioRegister.get('nombre')?.value;
      let password = this.formularioRegister.get('password')?.value;
      let password2 = this.formularioRegister.get('password2')?.value;
      let result: any = '';
      // registrar al usuario si las contraseñas son iguales
      if (password == password2) {
        result = await this.apiService.registrarUsuario(username, password);
      } else {
        this.alertMessage = 'Las contraseñas deben ser identicas';
        this.showAlert = true;
        this.presentAlert();
      }
      if (result) {
        this.router.navigate(['/tabs/tabs/tab1']);
      } else {
        this.alertMessage = 'Nombre de usuario ya registrado';
        this.showAlert = true;
        this.presentAlert();
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      this.alertMessage = 'Error al registrar usuario';
      this.showAlert = true;
      this.presentAlert();
    }
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
}
