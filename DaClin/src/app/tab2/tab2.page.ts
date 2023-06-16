import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Cita } from '../model/citas';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
  citas: Cita[] = [];
  isExpanded: boolean[] = [];
  formularioCita: FormGroup;
  motivoRegex = '[a-zA-Z0-9]{4,}';
  especialidadRegex = '[a-zA-Z]{4,}';


  constructor(public apiService: ApiService, public fb: FormBuilder) {
      this.isExpanded = this.citas.map(() => false);
    this.formularioCita = this.fb.group({
      motivo: new FormControl('', [
        Validators.required,
        Validators.pattern(this.motivoRegex),
      ]),
      especialidad: new FormControl('', [ Validators.required, Validators.pattern(this.especialidadRegex) ]),
      fecha: new FormControl('')
    });
  }

  getCitaForm() {
    let motivo = this.formularioCita.get('motivo');
    let especialidad = this.formularioCita.get('especialidad');
    let fecha = this.formularioCita.get('fecha');

    if (motivo?.invalid || especialidad?.invalid || fecha?.invalid) {
      return false;
    } else {
      console.log("print fecha:" + fecha?.value);
      return {
        "motivo":motivo?.value,
        "especialidad":especialidad?.value,
        "fecha":fecha?.value
      };
    }
  }

  guardarCita(){
    console.log("en guardarCita()")
    let citaForm = this.getCitaForm();
    if(citaForm != false){
      this.apiService.crearCita(citaForm["motivo"],citaForm["especialidad"],citaForm["fecha"])
      console.log("cita supuestamente guardada")
    }

  }

  toggleExpand(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  ionViewDidEnter() {
    this.citas = this.apiService.getCitas();
    // hacer que this.citas[i].motivo sea la primera letra en mayúscula
    this.citas.forEach(cita => {
      cita.motivo = cita.motivo[0].toUpperCase() + cita.motivo.slice(1);
      cita.especialidad = cita.especialidad[0].toUpperCase() + cita.especialidad.slice(1);
    });

  }


  onIonInfinite(ev: any) {
    this.citas;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
