import { Component } from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  recordatodios: any = [];
  usuarios: any = [];

  constructor(private api:ApiService) {}

  ionViewDidEnter() {
    console.log("prueba de consumo de api:");
    this.usuarios = this.api.getUsuarios().subscribe((data) => {
      console.log("data: ", data);
    });
  }

}
