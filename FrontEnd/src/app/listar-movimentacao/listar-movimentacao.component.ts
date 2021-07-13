import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movimentacao } from '../movimentacao';
import { MovimentacaoForm } from '../movimentacaoForm';
import { MovimentacaoService } from '../movimentacao.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-listar-movimentacao',
  templateUrl: './listar-movimentacao.component.html',
  styleUrls: ['./listar-movimentacao.component.css'],
  providers : [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    MovimentacaoService
  ]
})
export class ListarMovimentacaoComponent implements OnInit {

  @Input()
  movimentacaoForm : MovimentacaoForm = new MovimentacaoForm();
  acao: boolean = false;
  mensagem : string = "";
  movimentacoes!: Movimentacao[];

  constructor(    
    private router: Router,
    private service: MovimentacaoService) { }

  ngOnInit(): void {
    this.service.listar().subscribe(movimentacoes =>{
        this.movimentacoes = movimentacoes;
    });
    this.movimentacaoForm = new MovimentacaoForm();
  }

  exibir(numConta: number){
    this.router.navigate(['/contaCorrente', numConta]);
  }

  movimentar(movimentacaoForm : MovimentacaoForm){
    let numConta = movimentacaoForm.numConta;
    this.service.movimentar(movimentacaoForm);
    this.acao = true;
    this.mensagem = "Movimentacao para " + movimentacaoForm.numConta;
    this.router.navigate(['/movimentacoes']);
  }

}
