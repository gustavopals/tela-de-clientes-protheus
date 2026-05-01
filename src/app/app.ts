import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: false
})
export class App {
  readonly appTitle = 'Cadastro de Clientes Protheus';
  readonly menus: PoMenuItem[] = [];
}
