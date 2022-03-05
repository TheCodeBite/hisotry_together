import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment.prod';
import { CrudComponent } from './componentes/crud/crud.component';
import { HomeComponent } from './componentes/recuerdo/home/home.component';
import { TimelineComponent } from './componentes/recuerdo/home/timeline/timeline.component';
import { GallerySlideComponent } from './componentes/recuerdo/home/gallery-slide/gallery-slide.component';
import { AniversarioComponent } from './componentes/recuerdo/home/aniversario/aniversario.component';


@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    HomeComponent,
    TimelineComponent,
    GallerySlideComponent,
    AniversarioComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
