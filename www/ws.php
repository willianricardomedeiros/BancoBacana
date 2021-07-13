<?php
   require "Banco.php";
   //require "ContaCorrente.php";
   header("Access-Control-Allow-Origin: *");
   header("Content-Type: application/json; charset=UTF-8");
   header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
   header("Access-Control-Max-Age: 3600");
   header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

   $requestMethod = $_SERVER["REQUEST_METHOD"];
   $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
   $uri = explode('/', $uri);

   $uriName = $uri[2];


   if ($uriName == 'ContaCorrente') {
      $contaId = (int)$uri[3];
      if (isset($uri[3])) {
         //$contaId = (int)$uri[3];
         
         switch ($requestMethod) {
            case 'GET':
                if ($contaId) {
                   $contaCorrente = Banco::obterContaCorrente($contaId);
                   $response['status_code_header'] = 'HTTP/1.1 200 OK';
                   //$response['body'] = '{'.$contaCorrente->getNumConta().', '.$contaCorrente->getLimite().', '.$contaCorrente->getAberta().'}';
                   //$response['body'] = '{"numConta":"1","limite":"100.00","aberta":"1"}';
                   $response['body'] = '{"numConta":'.$contaCorrente->getNumConta().',"limite":'.$contaCorrente->getLimite().',"aberta":'.$contaCorrente->getAberta().'}';
                } else {
                  $resultado = Banco::listarContas();
                  $response['status_code_header'] = 'HTTP/1.1 200 OK';
                  $response['body'] = json_encode($resultado);
                };
                break;
            case 'POST':
                echo("POST");
                $input = (array) json_decode(file_get_contents('php://input'), TRUE);
                $contaCorrente = new ContaCorrente(0, $input['limite'], $input['aberta']);
                Banco::abrirConta($contaCorrente);
                $response['status_code_header'] = 'HTTP/1.1 200 OK';
                $response['body'] = '{}';
                break;
            case 'PUT':
                if ($contaId) {
                   $acao = file_get_contents('php://input');
                   if($acao == "encerrar"){
                      $contaCorrente = Banco::fecharConta($contaId);
                      $response['status_code_header'] = 'HTTP/1.1 200 OK';
                      $response['body'] = 'OK';
                   }
                   else if($acao == "reabrir"){
                      $contaCorrente = Banco::reabrirConta($contaId);
                      $response['status_code_header'] = 'HTTP/1.1 200 OK';
                      $response['body'] = 'OK';
                   }
                   else {
                      echo("PUT 404");
                   }
                }
                else {
                   echo("PUT 404");
                }
            	 
                //$response = $this->update();
                break;
            case 'DELETE':
            	 echo("DELETE");
                //$response = $this->delete();
                break;
        }
         
         
      }
      echo $response['body'];
   }
   else if ($uriName == 'Movimentacao') {
      $movId = (int)$uri[3];
      $saldo = $uri[4];
      if (isset($uri[3])) {
         //$movId = (int)$uri[3];
         switch ($requestMethod) {
            case 'GET':
                if ($movId) {
                   if ($saldo) {
                      $resultado  = Banco::emitirSaldo($movId);
                      $response['status_code_header'] = 'HTTP/1.1 200 OK';
                      $response['body'] = json_encode($resultado);
                   }
                   else{
		      $resultado  = Banco::emitirExtrato($movId);
		      $response['status_code_header'] = 'HTTP/1.1 200 OK';
		      $response['body'] = json_encode($resultado);
                   }
                }
                else {
                  $resultado = Banco::listarMovimentacao();
                  $response['status_code_header'] = 'HTTP/1.1 200 OK';
                  $response['body'] = json_encode($resultado);
                };
                break;
            case 'POST':
                $operacao = $input['operacao'];
                $numConta = $input['numConta'];
                $valor = $input['valor'];
                if ($operacao == "Credito") {
                   $resultado = Banco::deposito($numConta, $valor);
                   $response['status_code_header'] = 'HTTP/1.1 200 OK';
                   $response['body'] = '{}';
                }
                else if ($operacao == "Debito") {
                   $resultado = Banco::saque($numConta, $valor);
                   $response['status_code_header'] = 'HTTP/1.1 200 OK';
                   $response['body'] = '{}';
                }
                else if ($operacao == "DebitoCredito") {
                   $numContaDestino = $input['numContaDestino'];
                   $resultado = Banco::transferencia($numConta, $valor);
                   $response['status_code_header'] = 'HTTP/1.1 200 OK';
                   $response['body'] = '{}';
                }
                else {
                    echo("PUT 404");
                }
                break;
         }
      }
      echo $response['body'];
   }
   else{
      echo("404");
   }  

/*
if ($tableName == 'cerveja') {
	$cervejaId = null;
	if (isset($uri[3])) {
		$cervejaId = (int)$uri[3];
	}
	$controller = new CervejaController($requestMethod, $cervejaId);
	$controller->processRequest();
}
else {
   echo("OK");
}
*/


?>
