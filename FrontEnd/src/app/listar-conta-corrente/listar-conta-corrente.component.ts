import { Component, OnInit } from '@angular/core';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ContaCorrente } from '../conta-corrente';
import { ContaCorrenteService } from '../conta-corrente.service';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@Component({
  selector: 'app-listar-conta-corrente',
  templateUrl: './listar-conta-corrente.component.html',
  styleUrls: ['./listar-conta-corrente.component.css'],
  providers : [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    ContaCorrenteService
  ]
})

export class ListarContaCorrenteComponent implements OnInit {

  contaCorrentes!: ContaCorrente[];
  urlws : string = "";

  constructor(
    private router: Router,
    private service: ContaCorrenteService) {  }

  ngOnInit() {
    this.urlws = this.service.getURL(1);
    //this.contaCorrentes = this.service.listar();
    this.service.listar().subscribe(contaCorrentes =>{
        this.contaCorrentes = contaCorrentes;
    });
  }

  get listaContaCorrentes() {
    return this.contaCorrentes;
  }

  exibir(contaCorrente: ContaCorrente){
    this.router.navigate(['/contaCorrente', contaCorrente.numConta])
  }
}
