import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { RegistrosComponent } from './components/registros/registros.component';
import { RegistroComponent } from './components/registro/registro.component';
import { Routing } from './app.routes';

@NgModule({
  declarations: [AppComponent, RegistrosComponent, RegistroComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Routing,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
