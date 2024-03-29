import { Injectable } from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { LoadingController, Platform } from '@ionic/angular';
import { AuthService } from '../../autenticacion/auth.service';
import { PagesEndpointsService } from '../pages-endpoints.service';
import { Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class CamaraManageService {

  constructor(private auth:AuthService,private platform: Platform,private loadingCtrl: LoadingController, private apiService:PagesEndpointsService) { }

  async guardarExamen(nombre:string, razon:string, fecha:string, imagenBase64:string): Promise<boolean>{
    //validad campos no vacios
    if(nombre=="" || razon=="" || fecha==""){
      return false;
    }
    let data = {
      imagen: imagenBase64,
      nombre: nombre,
      razon: razon,
      fecha: fecha
    }
    let response = this.apiService.crearExamen(data);
    return true;
  }

  async selectImage(): Promise<Photo>{
    return await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
  }

async getImage(image:Photo):Promise<string> {
  return this.readAsBase64(image)
}

private async readAsBase64(photo: Photo) {
  // "hybrid" will detect Cordova or Capacitor
  if (this.platform.is('hybrid')) {
    // Read the file into base64 format
    const file = await Filesystem.readFile({
      path: photo.path!
    });

    return `data:image/jpeg;base64,${file.data}`
  }
  else {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }
}

private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});
}
