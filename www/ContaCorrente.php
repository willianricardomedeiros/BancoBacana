<?php
	class ContaCorrente {
		private $numConta;
		private $aberta;
		private $limite;


		public function __construct($numConta, $limite, $aberta){
			$this->numConta = $numConta;
			$this->limite = $limite;
			$this->aberta = $aberta;
		}
		
		public function getAberta(){
			return $this->aberta;
		}
		
		public function getLimite(){
			return $this->limite;
		}
		
		public function getNumConta(){
			return $this->numConta;
		}
			
		public function setAberta(bool $aberta){
			$this->aberta = $aberta;
		}
		
		public function setLimite(float $limite){
			$this->limite = $limite;
		}
		
		public function setNumConta($numConta){
			$this->numConta = $numConta;
		}
		
	}
?>
