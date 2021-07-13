import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaCorrenteService } from '../conta-corrente.service';
import { MovimentacaoService } from '../movimentacao.service';
import { ContaCorrente } from '../conta-corrente';
import { Movimentacao } from '../movimentacao';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@Component({
  selector: 'app-exibir-conta-corrente',
  templateUrl: './exibir-conta-corrente.component.html',
  styleUrls: ['./exibir-conta-corrente.component.css'],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    ContaCorrenteService
  ]
})
export class ExibirContaCorrenteComponent implements OnInit {

  @Input()
  contaCorrente: ContaCorrente = new ContaCorrente();
  movimentacoes!: Movimentacao[];
  novo: boolean = false;
  aberta: boolean = false;
  saldo: number = 0;
  urlws : string = "";

  constructor(
    private serviceCC: ContaCorrenteService,
    private serviceMov: MovimentacaoService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    let numConta = this.route.snapshot.params['numConta'];
    if(numConta != "novo"){
      //this.contaCorrente = this.serviceCC.obter(numConta);
      this.urlws = this.serviceCC.getURL(numConta);
      this.serviceCC.obter(numConta).subscribe(contaCorrente => {
        this.contaCorrente = contaCorrente
      });
      //this.movimentacoes = this.serviceMov.listarPorConta(numConta);
      this.serviceMov.listarPorConta(numConta).subscribe(movimentacoes => {
        this.movimentacoes = movimentacoes
      });
      //this.saldo = this.serviceMov.obterSaldoConta(numConta);
      this.serviceMov.obterSaldoConta(numConta).subscribe(saldo => {
        this.saldo = saldo
      });
    }
    else{
      this.novo = true;
    }
  }

  encerrar(contaCorrente: ContaCorrente){
    this.serviceCC.encerrar(contaCorrente.numConta);
    this.router.navigate(['/contaCorrentes']);
  }

  reabrir(contaCorrente: ContaCorrente){
    this.serviceCC.reabrir(contaCorrente.numConta);
    this.router.navigate(['/contaCorrentes']);
  }

}
