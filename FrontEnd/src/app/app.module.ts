import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { ListarContaCorrenteComponent } from './listar-conta-corrente/listar-conta-corrente.component';
import { ExibirContaCorrenteComponent } from './exibir-conta-corrente/exibir-conta-corrente.component';
import { ListarMovimentacaoComponent } from './listar-movimentacao/listar-movimentacao.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarContaCorrenteComponent,
    ExibirContaCorrenteComponent,
    ListarMovimentacaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
