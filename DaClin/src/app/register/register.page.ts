import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { User } from '../model/users';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuarios: any = []; // Variable para almacenar los usuarios registrados para comprobar si existe el usuario
  username: string = '';
  password: string = '';
  password2: string = '';
  alertMessage: string = '';
  public alertButtons = ['OK'];
  showAlert = false; // Variable booleana para controlar la visibilidad de la alerta

  constructor(private apiService: ApiService, private router: Router, private alertController: AlertController) {

  }

  ngOnInit() {
    this.usuarios = this.apiService.getUsers();
  }
  async register() {
    try {
      const success = await this.apiService.registrarUsuario(this.username, this.password);
      if (success) {
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
      cssClass: 'animate__animated animate__heartBeat' // agrega las clases de animate.css para animar la alerta
    });

    await alert.present();
  }

}
