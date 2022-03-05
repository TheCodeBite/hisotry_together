import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModeloAlbum } from 'src/app/interfaces/modelo/modelo-album';
import { ModeloArchivo } from 'src/app/interfaces/modelo/modelo-archivo';
import { ModeloYear } from 'src/app/interfaces/modelo/modelo-year';
import { GaleriServiceService } from 'src/app/services/galeria/galeri-service.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  formularioArchivo: FormGroup;

  albumName: String = "";
  year: String;
  type: String;

  albumSeleccionado: any;
  yearSeleccionado: ModeloYear;

  arrayAlbums: ModeloAlbum[];
  arrayYears: ModeloYear[];
  private archivo: ModeloArchivo;

  //Datos del formulario de archivo
  mensajeArchivo = 'No hay un archivo seleccionado';
  datosFormulario = new FormData();
  nombreArchivo = '';
  URL = '';
  porcentaje = 0;
  finalizado = false;

  constructor(private db: AngularFirestore, private galeriService: GaleriServiceService, private fb: FormBuilder) { }
  ngOnInit(): void {
    console.log(this.albumSeleccionado);
    this.getYears();
    this.obtenerAlbums();
  }

  archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required)
  });

  //Evento que se gatilla cuando el input de tipo archivo cambia
  cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
      let splitName = this.nombreArchivo.split(".");

      if(splitName[splitName.length-1].toLocaleLowerCase() == "jpg" || splitName[splitName.length-1].toLocaleLowerCase() == "jpeg"  || splitName[splitName.length-1].toLocaleLowerCase() == "png"){
        this.type = "1"
        console.log("imagen");
        
      } else {
        this.type = "2"
        console.log("video");
        
      }
      
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  subirArchivo() {
    if (this.albumSeleccionado == null || this.yearSeleccionado == null) {
      console.log("seleccione album o año :3");
      return;
    }
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.galeriService.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.galeriService.tareaCloudStorage(this.nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;

        referencia.getDownloadURL().subscribe((URL) => {
          this.URL = URL;
          this.archivo = {
            nombre: this.nombreArchivo,
            url: this.URL,
            type: this.type
          }
          this.yearSeleccionado.meses[this.albumSeleccionado].archivo.push(this.archivo)
          this.actualizarAlbum();
        });
      }
    });

  }


  crearAlbum() {

    if (!this.yearSeleccionado) {
      return;
    }

    this.yearSeleccionado.meses.push({
      Descripcion: '',
      abreviatura: '',
      nombre: this.albumName,
      archivo: []
    })

    this.galeriService.updateYear(this.yearSeleccionado.key, this.yearSeleccionado).then(() => {
      console.log("Exito!");
      this.yearSeleccionado = null;
      this.albumName = null
    }, error => {
      console.log("Ups! Error");
    })

  }

  obtenerAlbums() {
    this.galeriService.getAlbum().subscribe((responseAlbums) => {
      var albumsRepuesta: ModeloAlbum[] = []
      responseAlbums.forEach((catData: any) => {
        var achivo_modelo: ModeloArchivo[] = catData.payload.doc.data().archivo;
        albumsRepuesta.push({
          key: catData.payload.doc.id,
          nombre: catData.payload.doc.data().nombre,
          archivo: achivo_modelo
        })
      })
      this.arrayAlbums = albumsRepuesta;
    })
  }

  Selectid(album: ModeloAlbum) {
    this.albumSeleccionado = album;
    console.log(this.albumSeleccionado);
  }

  SelectIdYear(yearItem: ModeloYear) {
    this.yearSeleccionado = yearItem;
    console.log(this.yearSeleccionado);
    this.albumSeleccionado = null;
    this.arrayAlbums = this.yearSeleccionado.meses;
  }

  private actualizarAlbum() {
    this.galeriService.updateYear(this.yearSeleccionado.key, this.yearSeleccionado).then(() => {
      console.log("actualizado correctamente");
      this.yearSeleccionado = null;
      this.albumSeleccionado = null;
    }, error => {
      console.log(error);
    })
  }


  crearYear() {
    if (!this.year) {
      return;
    }

    var modelYear: ModeloYear = {
      meses: [],
      year: this.year
    }

    this.galeriService.createYear(modelYear).then(() => {
      console.log("Exito!");
    }, error => {
      console.log("Ups! Error");
    })

    this.year = null;

  }

  private getYears() {
    this.galeriService.getYears().subscribe((responseYears) => {
      var arrayYearsTemp: ModeloYear[] = [];
      responseYears.forEach((yearData: any) => {
        var achivo_modelo: ModeloArchivo[] = yearData.payload.doc.data().archivo;
        arrayYearsTemp.push({
          key: yearData.payload.doc.id,
          year: yearData.payload.doc.data().year,
          meses: yearData.payload.doc.data().meses,
        })
      })
      this.arrayYears = arrayYearsTemp;
      console.log(this.arrayYears);

    })
  }

}
