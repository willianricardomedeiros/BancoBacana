import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimentacao } from './movimentacao';
import { MovimentacaoForm } from './movimentacaoForm';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {
  private static movimentacoes : Movimentacao[] = new Array();
  private static idMovimentacao : number = 4;

  constructor(private http: HttpClient) {
    //this.inicializar();
  }

  inicializar() {
    if(MovimentacaoService.movimentacoes.length == 0){
      let movimentacao = new Movimentacao();
      movimentacao.id = 1;
      movimentacao.numConta = 1;
      movimentacao.tipo = 'Credito';
      movimentacao.descricao = 'Deposito em C/C';
      movimentacao.valor = 10;
      MovimentacaoService.movimentacoes.push(movimentacao);

      movimentacao = new Movimentacao();
      movimentacao.id = 2;
      movimentacao.numConta = 1;
      movimentacao.tipo = 'Credito';
      movimentacao.descricao = 'Deposito em C/C';
      movimentacao.valor = 15;
      MovimentacaoService.movimentacoes.push(movimentacao);

      movimentacao = new Movimentacao();
      movimentacao.id = 3;
      movimentacao.numConta = 2;
      movimentacao.tipo = 'Debito';
      movimentacao.descricao = 'Creditado da C/C';
      movimentacao.valor = 100;
      MovimentacaoService.movimentacoes.push(movimentacao);
    }
  }

  /**
   * Lista de Movimentacoes
   */
   listar(): Observable<Movimentacao[]>{
    const url = `${environment.bancoBacanaBackURL}/Movimentacao/`;
    return this.http.get<Movimentacao[]>(url);
  }

  /**
   * Lista de Movimentacoes de respectiva conta
   */
   //listarPorConta(numConta : number): Movimentacao[]{
   // let movimentacoesConta : Movimentacao[] = new Array();
   // for(var i=0; i < MovimentacaoService.movimentacoes.length; i++){
   //   if(MovimentacaoService.movimentacoes[i].numConta == numConta){
   //     movimentacoesConta.push(MovimentacaoService.movimentacoes[i]);
   //   }
   // }
   // return movimentacoesConta;
  //}
  listarPorConta(numConta : number): Observable<Movimentacao[]>{
    const url = `${environment.bancoBacanaBackURL}/Movimentacao/${numConta}`;
    return this.http.get<Movimentacao[]>(url);
  }

  /**
   * Obter saldo de respectiva conta, de acordo com suas movimentações
   */
  obterSaldoConta(numConta : number):  Observable<number>{
    //let movimentacoesConta : Movimentacao[] = this.listarPorConta(numConta);
    //let saldocc : number = 0;
    //for(var i=0; i < movimentacoesConta.length; i++){
    //  if(movimentacoesConta[i].tipo == "Debito"){
    //    saldocc = saldocc - movimentacoesConta[i].valor;
    //  }
    //  else {
    //    saldocc = saldocc + movimentacoesConta[i].valor;
    //  }
    //}
    //return saldocc;
    const url = `${environment.bancoBacanaBackURL}/Movimentacao/${numConta}/saldo`;
    return this.http.get<number>(url);
  }

  movimentar(movimentacaoForm: MovimentacaoForm) {
    const url = `${environment.bancoBacanaBackURL}/Movimentacao/`;
    this.http.post<MovimentacaoForm>(url, movimentacaoForm).subscribe;
  }

}
