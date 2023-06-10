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
  usuarios: User[] = []; // Variable para almacenar los usuarios registrados para comprobar si existe el usuario
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
    let userIsRegistered = !!this.usuarios.find(user => user.username == this.username);
    console.log(userIsRegistered);
    if (userIsRegistered == false) {
      this.router.navigate(['/tabs/tabs/tab1']);
    } else {
      this.alertMessage = 'Nombre de usuario ya registrado';
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
