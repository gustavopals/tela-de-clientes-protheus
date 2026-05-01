import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ClientesPlaceholderPage } from './clientes-placeholder-page';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [App, ClientesPlaceholderPage],
  imports: [BrowserModule, AppRoutingModule, PoModule, PoTemplatesModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [App]
})
export class AppModule {}
