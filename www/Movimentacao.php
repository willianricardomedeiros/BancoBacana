<?php
	class Movimentacao {
		private $descricao;
		private $valor;
		private $tipo
		
		public function getDescricao(){
			return $this->descricao;
		}
		
		public function getTipo(){
			return $this->tipo;
		}
		
		public function getValor(){
			return $this->valor;
		}
			
		public function setDescricao($descricao){
			$this->descricao = $descricao;
		}
		
		public function setTipo($tipo){
			$this->tipo = $tipo;
		}
		
		public function setValor($valor){
			$this->valor = $valor;
		}
		
	}
?>
