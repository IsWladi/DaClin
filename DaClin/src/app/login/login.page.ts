import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { User } from '../model/users';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  alertMessage: string = '';
  public alertButtons = ['OK'];
  showAlert = false; // Variable booleana para controlar la visibilidad de la alerta

  constructor(private apiService: ApiService, private router: Router, private alertController: AlertController) {

  }

  ngOnInit() {
  }
async login() {
  try {
    const user = await this.apiService.loginUsuario(this.username, this.password);
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
      cssClass: 'animate__animated animate__heartBeat' // agrega las clases de animate.css para animar la alerta
    });

    await alert.present();
  }

}
