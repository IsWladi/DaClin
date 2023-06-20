import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/autenticacion/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  alertMessage: string = '';
  public alertButtons = ['OK'];
  showAlert = false; // Variable booleana para controlar la visibilidad de la alerta

  // formulario
  formularioLogin: FormGroup;
  usernameRegex = '[a-zA-Z0-9]{3,}';

  constructor(
    private apiService: AuthService,
    private router: Router,
    private alertController: AlertController,
    public fb: FormBuilder
  ) {
    this.formularioLogin = this.fb.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(this.usernameRegex),
      ]),
      password: new FormControl('', Validators.required),
      saveConnection: new FormControl(false),
    });
  }

  isValidForm() {
    let isValid = this.formularioLogin.valid;
    if (isValid) {
      return true;
    } else {
      return false;
    }
  }

  errorPass() {
    let pass = this.formularioLogin.get('password');
    if (pass?.invalid && pass?.touched) {
      return true;
    } else {
      return false;
    }
  }

  errorNombre() {
    let username = this.formularioLogin.get('nombre');
    if (username?.invalid && username?.touched) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    if (this.apiService.isLoggedIn()) {
      this.router.navigate(['/tabs/tabs/tab1']);
    }
  }
  async login() {
    try {
      let username = this.formularioLogin.get('nombre')?.value;
      let password = this.formularioLogin.get('password')?.value;
      let saveConnection = this.formularioLogin.get('saveConnection')?.value;

      const user = await this.apiService.loginUsuario(username, password, saveConnection);
      if (user) {
        this.router.navigate(['/tabs/tabs/tab1']);
      } else {
        this.alertMessage = 'Usuario o contraseña incorrecta';
        this.showAlert = true; // Actualiza la variable para mostrar la alerta
        this.presentAlert(); // Llama al método para mostrar la alerta
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.alertMessage = 'Error al iniciar sesión';
      this.showAlert = true; // Actualiza la variable para mostrar la alerta
      this.presentAlert(); // Llama al método para mostrar la alerta
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
