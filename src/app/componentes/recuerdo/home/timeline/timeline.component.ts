import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModeloArchivo } from 'src/app/interfaces/modelo/modelo-archivo';
import { ModeloYear } from 'src/app/interfaces/modelo/modelo-year';
import { GaleriServiceService } from 'src/app/services/galeria/galeri-service.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() retornaMes = new EventEmitter<ModeloArchivo[]>();
  @Input() arrayTimeLine: ModeloYear[];
  yearSelected: ModeloYear = null;

  position = 0;

  constructor() { }

  ngOnInit(): void {
    this.yearSelected = this.arrayTimeLine[this.position];
    console.log(this.yearSelected);
    
  }

  cerrarModal = () => this.newItemEvent.emit(true);

  selectMes = (data: ModeloArchivo[]) => this.retornaMes.emit(data);
}