import { Component, OnInit } from '@angular/core';
import { ModeloArchivo } from 'src/app/interfaces/modelo/modelo-archivo';
import { ModeloYear } from 'src/app/interfaces/modelo/modelo-year';
import { GaleriServiceService } from 'src/app/services/galeria/galeri-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  verSlide: Boolean = false;

  arrayTimeLine: ModeloYear[];
  yearSelected: ModeloYear = null;
  mesSeleccionado: ModeloArchivo[];

  constructor(private galleriaService: GaleriServiceService) { }

  ngOnInit(): void {
    this.getYears();
  }

  private getYears() {
    this.galleriaService.getYears().subscribe((responseYears) => {
      var arrayYearsTemp: ModeloYear[] = [];
      responseYears.forEach((yearData: any) => {
        var achivo_modelo: ModeloArchivo[] = yearData.payload.doc.data().archivo;
        arrayYearsTemp.push({
          key: yearData.payload.doc.id,
          year: yearData.payload.doc.data().year,
          meses: yearData.payload.doc.data().meses,
        })
      })
      this.arrayTimeLine = arrayYearsTemp;
      this.yearSelected = this.arrayTimeLine[0];
    })
  }

  closeModal = (data: Boolean) => this.verSlide = data;

  openModal = (data: Boolean) => this.verSlide = data;

  selectMes = (data: ModeloArchivo[]) => this.mesSeleccionado = data;
  
}
