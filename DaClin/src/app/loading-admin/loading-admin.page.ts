import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/autenticacion/auth.service';
import { Router } from '@angular/router';

let intervalId: any;

@Component({
  selector: 'app-loading-admin',
  templateUrl: './loading-admin.page.html',
  styleUrls: ['./loading-admin.page.scss'],
})
export class LoadingAdminPage implements OnInit {
  public progress = 0;
  message: string = "";
  usuario: any = "";

  constructor(private auth: AuthService, private router: Router) {

    intervalId = setInterval(() => {
      this.progress += 0.02;
      if ( this.progress>0.4 && auth.isLoggedIn() == false){
        this.message = "Saludos :D";
      }
      else if ( this.progress>0.4 && auth.isLoggedIn() == true){
        this.message = "Saludos, "+this.usuario+" :)";
        }
      if( this.progress >1 && auth.isLoggedIn() == true){
        this.stopInterval();
        this.router.navigate(['/tabs/tabs/tab1']);
      }
      else if( this.progress >1 && auth.isLoggedIn() == false){
        this.stopInterval();
        this.router.navigate(['/login']);
      }
    }, 50);

  }
// Método para detener el intervalo
stopInterval() {
  clearInterval(intervalId);
}

  async ionViewDidEnter(){
    this.usuario = await this.auth.getUsername();
  }

  ngOnInit() {
  }

}
