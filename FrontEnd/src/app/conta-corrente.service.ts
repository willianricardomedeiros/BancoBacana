import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContaCorrente } from './conta-corrente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContaCorrenteService {
  private static contaCorrentes : ContaCorrente[] = new Array();
  private static idConta : number = 4; 

  constructor(private http: HttpClient) { 
        //this.inicializar();
  }

  inicializar() {
    if(ContaCorrenteService.contaCorrentes.length == 0){
      let contaCorrente = new ContaCorrente();
      contaCorrente.numConta = 1;
      contaCorrente.limite = 1000;
      contaCorrente.aberta = 1;
      ContaCorrenteService.contaCorrentes.push(contaCorrente);

      contaCorrente = new ContaCorrente();
      contaCorrente.numConta = 2;
      contaCorrente.limite = 2000;
      contaCorrente.aberta = 1;
      ContaCorrenteService.contaCorrentes.push(contaCorrente);

      contaCorrente = new ContaCorrente();
      contaCorrente.numConta = 3;
      contaCorrente.limite = 1500;
      contaCorrente.aberta = 1;
      ContaCorrenteService.contaCorrentes.push(contaCorrente);
    }
  }

  getURL(numConta : number): string {
    //return `${environment.bancoBacanaBackURL}/ContaCorrente/`;
    return `${environment.bancoBacanaBackURL}/ContaCorrente/${numConta}`;
  }

  /**
   * Lista as Conta-Correntes
   */
  //listar(): ContaCorrente[]{
  //  return ContaCorrenteService.contaCorrentes;
  //}
  listar(): Observable<ContaCorrente[]>{
    const url = `${environment.bancoBacanaBackURL}/ContaCorrente/`;
    return this.http.get<ContaCorrente[]>(url);
  }

  /**
   * Grava a Conta-Corrente
   * 
   * @param contaCorrente 
   * @returns 
   */
  salvar(contaCorrente : ContaCorrente){
    for(var i=0; i < ContaCorrenteService.contaCorrentes.length; i++){
      if(ContaCorrenteService.contaCorrentes[i].numConta == contaCorrente.numConta){
        ContaCorrenteService.contaCorrentes[i] = contaCorrente;
        return;
      }
    }
    contaCorrente.numConta++;
    ContaCorrenteService.contaCorrentes.push(contaCorrente);
  }

  /**
   * Informado um numConta, retorna a ContaCorrente respectivo ao número informado
   * @param numConta 
   * @returns 
   */
  //obter(numConta : number) : ContaCorrente {
  //  for(var i=0; i < ContaCorrenteService.contaCorrentes.length; i++){
  //   if(ContaCorrenteService.contaCorrentes[i].numConta == numConta){
  //      return ContaCorrenteService.contaCorrentes[i];
  //    }
  //  }
  //  return new ContaCorrente;
  //}
  obter(numConta : number) : Observable<ContaCorrente> {
    const url = `${environment.bancoBacanaBackURL}/ContaCorrente/${numConta}`;
    return this.http.get<ContaCorrente>(url);
  }


  /**
   * Encerra a conta corrente
   * @param numConta Número da conta corrente
   * @returns 
   */
  encerrar(numConta : number){
    //for(var i=0; i < ContaCorrenteService.contaCorrentes.length; i++){
    //  if(ContaCorrenteService.contaCorrentes[i].numConta == numConta){
    //    ContaCorrenteService.contaCorrentes[i].aberta = 0;
    //    return;
    //  }
    //}
    const url = `${environment.bancoBacanaBackURL}/ContaCorrente/${numConta}`;
    this.http.put<ContaCorrente>(url,"encerrar").subscribe();
  }

  /**
   * Reabre a conta corrente
   * @param numConta Numero da conta corrente
   * @returns 
   */
  reabrir(numConta : number){
    //for(var i=0; i < ContaCorrenteService.contaCorrentes.length; i++){
    //  if(ContaCorrenteService.contaCorrentes[i].numConta == numConta){
    //    ContaCorrenteService.contaCorrentes[i].aberta = 1;
    //    return;
    //  }
    //}
    const url = `${environment.bancoBacanaBackURL}/ContaCorrente/${numConta}`;
    this.http.put<ContaCorrente>(url,"reabrir").subscribe();
  }

}
