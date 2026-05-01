import { Routes } from '@angular/router';

import { ClienteDetailPageComponent } from './pages/cliente-detail-page/cliente-detail-page.component';
import { ClienteEditPageComponent } from './pages/cliente-edit-page/cliente-edit-page.component';
import { ClienteListPageComponent } from './pages/cliente-list-page/cliente-list-page.component';

export const CLIENTES_ROUTES: Routes = [
  { path: '', component: ClienteListPageComponent },
  { path: ':filial/:cod/:loja', component: ClienteDetailPageComponent },
  { path: ':filial/:cod/:loja/editar', component: ClienteEditPageComponent }
];
