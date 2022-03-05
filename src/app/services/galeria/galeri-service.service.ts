import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModeloAlbum } from 'src/app/interfaces/modelo/modelo-album';
import { ModeloYear } from 'src/app/interfaces/modelo/modelo-year';

@Injectable({
  providedIn: 'root'
})
export class GaleriServiceService {

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

  getAlbum() {
    return this.db.collection('album').snapshotChanges();
  }

  createAlbum(album: ModeloAlbum) {
    return this.db.collection('album').add(album);
  }

  public updateAlbum(albumId: any, album: ModeloAlbum) {
    return this.db.collection('album').doc(albumId).set(album);
  }

  /* SERVICE YEAR*/

  getYears() {
    return this.db.collection('years').snapshotChanges();
  }

  createYear(year: ModeloYear) {
    return this.db.collection('years').add(year);
  }

  public updateYear(yearId: any, year: ModeloYear) {
    return this.db.collection('years').doc(yearId).set(year);
  }

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
