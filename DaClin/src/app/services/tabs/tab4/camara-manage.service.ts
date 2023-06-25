import { Injectable } from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { AuthService } from '../../autenticacion/auth.service';
import { PagesEndpointsService } from '../pages-endpoints.service';

interface LocalFile{
  name: string,
  path: string,
  data: string,
}

@Injectable({
  providedIn: 'root'
})
export class CamaraManageService {

  images: LocalFile[] = [];
  IMAGE_DIR = "daclin_stored_files/" + this.auth.getUserId();
  constructor(private auth:AuthService,private platform: Platform,private loadingCtrl: LoadingController, private apiService:PagesEndpointsService) { }

  async guardarExamen(nombre:string, razon:string, fecha:string, imagenPath:string): Promise<boolean>{
    //validad campos no vacios
    if(nombre=="" || razon=="" || fecha==""){
      return false;
    }
    if(imagenPath==""){
      imagenPath = "no_image";
    }
    let data = {
      imagen: imagenPath,
      nombre: nombre,
      razon: razon,
      fecha: fecha
    }
    let response = this.apiService.crearExamen(data);
    return true;
  }

  async loadFiles(): Promise<LocalFile[]>{
    this.images = [];
    const loading = await this.loadingCtrl.create({
      message: 'Cargando imágenes...'
    });
    await loading.present();

    return Filesystem.readdir({
      path: this.IMAGE_DIR,
      directory: Directory.Data
    }).then(result => {
      // let fileNames = result.files.map(file => {
      //   // file.name borrarle la parte de /DATA/daclin_stored_files/ con regex
      //   let regex = /\/DATA\/daclin_stored_files\//;
      //   return file.uri.replace(regex, "");
      // });
      let fileNames = ["64978e0fcdb463b5881c09221687654021718.jpeg"];
      console.log("files: " + fileNames);
      return this.loadFileData(fileNames);

    }, async err => {
      console.log("error: " + err);
      await Filesystem.mkdir({
        path: this.IMAGE_DIR,
        directory: Directory.Data,
      });
    }).then(_ => {
      loading.dismiss();
      return [];
    });
  }
// async deleteSecretFile() {
//   await Filesystem.rmdir({
//     path: 'daclin_stored_images/64933d2d0e0b84e6501ac6b2',
//     directory: Directory.Data,
//     recursive: true
//   });
// };
  async loadFileData(filenames: string[]): Promise<LocalFile[]>{
    for(let f in filenames){
      const filePath = this.IMAGE_DIR + '/' + filenames[f];
      const fileData = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });
      console.log("READ:" +fileData + JSON.stringify(fileData));
      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${fileData.data}`
    });
  }
    return this.images;
  }

  async selectImage(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: this.platform.is('hybrid') ? CameraSource.Camera : CameraSource.Photos
    });
    if(image){
      await this.saveImage(image);
    }
  }

async saveImage(photo: Photo) {
  const base64Data = "";
  const fileName = new Date().getTime() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: this.IMAGE_DIR + fileName,
    data: base64Data,
    directory: Directory.Data
  });
  console.log("SAVED: " + JSON.stringify(savedFile));
}

private async readAsBase64(photo: Photo) {
  // "hybrid" will detect Cordova or Capacitor
  if (this.platform.is('hybrid')) {
    // Read the file into base64 format
    const file = await Filesystem.readFile({
      path: photo.path!
    });

    return file.data;
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
