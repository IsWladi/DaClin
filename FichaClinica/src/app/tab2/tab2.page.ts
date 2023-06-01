import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Cita } from '../model/citas';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
citas: Cita[] = [];
isExpanded: boolean[] = [];


  constructor(private apiService: ApiService) {
      this.isExpanded = this.citas.map(() => false);
  }

  toggleExpand(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  ionViewDidEnter() {
     this.citas = this.apiService.getCitas();
  }

  onIonInfinite(ev: any) {
    this.citas;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
