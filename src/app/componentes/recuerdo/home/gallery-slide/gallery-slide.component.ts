import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModeloArchivo } from 'src/app/interfaces/modelo/modelo-archivo';

@Component({
  selector: 'app-gallery-slide',
  templateUrl: './gallery-slide.component.html',
  styleUrls: ['./gallery-slide.component.scss']
})
export class GallerySlideComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() mesSeleccionado: ModeloArchivo[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.mesSeleccionado); 
  }

  closeModal = () => this.newItemEvent.emit(false);
}
