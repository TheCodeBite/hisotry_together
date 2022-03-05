import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './componentes/crud/crud.component';
import { HomeComponent } from './componentes/recuerdo/home/home.component';
import { GallerySlideComponent } from './componentes/recuerdo/home/gallery-slide/gallery-slide.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'controller', component: CrudComponent },
  { path: 'slide', component: GallerySlideComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
