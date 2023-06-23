import { Component, OnInit } from '@angular/core';
import { PagesEndpointsService } from '../services/tabs/pages-endpoints.service';
import { AuthService } from '../services/autenticacion/auth.service';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';

const IMAGE_DIR = "daclin_stored_images"

interface LocalFile{
  name: string,
  path: string,
  data: string,
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  images: LocalFile[] = [];

  constructor(private platform: Platform,private loadingCtrl: LoadingController ,public authService: AuthService) { }

  ngOnInit() {
    this.loadFiles();
  }
  async loadFiles(){
    this.images = [];
    const loading = await this.loadingCtrl.create({
      message: 'Cargando imagenes...'
    });
    await loading.present();
    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data
    }).then(async (result) => {
      console.log("resultado: " + JSON.stringify(result));
      const fileNames = result.files.map(file => file.name);
      this.loadFileData(fileNames);
    }, async (err) => {
      console.log("error: "+err);
      await Filesystem.mkdir({
        path: IMAGE_DIR,
        directory: Directory.Data,
      });

    }).then(_ => {
      loading.dismiss()}
    );
  }
  async loadFileData(filenames: string[]){
    for(let f in filenames){
      const filePath = IMAGE_DIR + '/' + filenames[f];
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
  }

  async selectImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
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
      path: `${IMAGE_DIR}/${filename}`,
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
