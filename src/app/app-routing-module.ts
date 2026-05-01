import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesPlaceholderPage } from './clientes-placeholder-page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clientes' },
  { path: 'clientes', component: ClientesPlaceholderPage },
  { path: '**', redirectTo: 'clientes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
