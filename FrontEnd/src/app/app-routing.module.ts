import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExibirContaCorrenteComponent } from './exibir-conta-corrente/exibir-conta-corrente.component';
import { ListarContaCorrenteComponent } from './listar-conta-corrente/listar-conta-corrente.component';
import { ListarMovimentacaoComponent } from './listar-movimentacao/listar-movimentacao.component';

const routes: Routes = [
  { path: 'contaCorrentes', component: ListarContaCorrenteComponent},
  { path: 'contaCorrente/:numConta', component: ExibirContaCorrenteComponent},
  { path: 'movimentacoes', component: ListarMovimentacaoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
