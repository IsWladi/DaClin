import { Injectable } from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { AuthService } from '../../autenticacion/auth.service';

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
  IMAGE_DIR = "";
  constructor(private auth:AuthService,private platform: Platform,private loadingCtrl: LoadingController) { }

  async loadFiles(): Promise<LocalFile[]> {
    this.IMAGE_DIR = "daclin_stored_images/" + this.auth.userId;
    this.images = [];
    const loading = await this.loadingCtrl.create({
      message: 'Cargando imágenes...'
    });
    await loading.present();

    return Filesystem.readdir({
      path: this.IMAGE_DIR,
      directory: Directory.Data
    }).then(async (result) => {
      console.log("resultado: " + JSON.stringify(result));
      const fileNames = result.files.map(file => file.name);
      return this.loadFileData(fileNames);
    }).catch(async (err) => {
      console.log("error: " + err);
      await Filesystem.mkdir({
        path: this.IMAGE_DIR,
        directory: Directory.Data,
      });
      return [];
    }).finally(() => {
      loading.dismiss();
    });
  }
  async loadFileData(filenames: string[]): Promise<LocalFile[]>{
    for(let f in filenames){
      const filePath = this.IMAGE_DIR + '/' + filenames[f];
      const fileData = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });
      console.log("READ:" +fileData);
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
      console.log(image);
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo){
    const filename = new Date().getTime() + '.jpeg';
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${this.IMAGE_DIR}/${filename}`,
      data: base64Data
    });
    console.log("saved file"+savedFile);
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
