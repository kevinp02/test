import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { RegistrosComponent } from './components/registros/registros.component';

const APP_ROUTES: Routes = [
  { path: 'lista', component: RegistrosComponent },
  { path: 'registro/:id', component: RegistroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'lista' },
];

export const Routing = RouterModule.forRoot(APP_ROUTES);