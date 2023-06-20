import { Component, OnInit } from '@angular/core';
import { PagesEndpointsService } from '../services/tabs/pages-endpoints.service';
import { AuthService } from '../services/autenticacion/auth.service';

import { Remedio } from '../model/remedios';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
remedios: Remedio[] = [];
isExpanded: boolean[] = [];


  constructor(private apiService: PagesEndpointsService, public authService: AuthService) {
      // this.isExpanded = this.remedios.map(() => false);
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
