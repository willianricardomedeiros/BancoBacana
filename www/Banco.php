<?php
    require_once("MySQLConfig.php");
    require_once("ContaCorrente.php");
    require_once("TipoMovimento.php");

	class Banco {
		
		
		public static function listarContas() : array {
			//Criando driver e obtendo conexao
			$mySQLConfig = new MySQLConfig();
			$conn = $mySQLConfig->connect();
			
			// buscar as ContasCorrentes do Banco
			$sql = "SELECT numConta, limite, aberta FROM ContaCorrente";
			$resultSet = $conn->query($sql);
			$resultado = mysqli_fetch_all($resultSet, MYSQLI_ASSOC);
			$conn->close(); 
			
			return $resultado;
		}
		
		public static function listarMovimentacao() : array {
			//Criando driver e obtendo conexao
			$mySQLConfig = new MySQLConfig();
			$conn = $mySQLConfig->connect();
			
			// buscar as ContasCorrentes do Banco
			$sql = "SELECT numConta, tipo, descricao, valor FROM Movimentacao";
			$resultSet = $conn->query($sql);
			$resultado = mysqli_fetch_all($resultSet, MYSQLI_ASSOC);
			$conn->close(); 
			
			return $resultado;
		}
		
		public static function abrirConta($contaCorrente){
			//Criando driver e obtendo conexao
			$mySQLConfig = new MySQLConfig();
			$conn = $mySQLConfig->connect();
			
			// Criando nova ContasCorrente
			$sql = "INSERT INTO ContaCorrente (limite, aberta) VALUES (".$contaCorrente->getLimite().",".$contaCorrente->getAberta().");";
			//$sql = "INSERT INTO ContaCorrente (limite, aberta) VALUES (700 , 1);";
			$resultSet = $conn->query($sql);
			$conn->close();
			return $resultSet;
		}
		
		public static function obterContaCorrente($numConta) {
			try{
				//Criando driver e obtendo conexao
				$mySQLConfig = new MySQLConfig();
				$conn = $mySQLConfig->connect();

				// buscar as ContasCorrentes do Banco
				$sql = "SELECT numConta, limite, aberta FROM ContaCorrente WHERE numConta =".$numConta;
				$resultSet = $conn->query($sql);
				
				if ($resultSet->num_rows > 0) {
					$resultado = mysqli_fetch_all($resultSet, MYSQLI_ASSOC)[0];
					$contaCorrente = new ContaCorrente($resultado["numConta"], $resultado["limite"], $resultado["aberta"]);
				}
				$conn->close();
				
				return $contaCorrente;
			}
			catch(throwable $e){
				echo "Erro=".$e;
			}
		}
		
		public static function fecharConta($numConta){
			//Criando driver e obtendo conexao
			$mySQLConfig = new MySQLConfig();
			$conn = $mySQLConfig->connect();
			
			// Fechando ContasCorrente
			$sql = "UPDATE ContaCorrente SET aberta = 0 WHERE numConta = ".$numConta.";";
			$resultSet = $conn->query($sql);
			$conn->close();
			return $resultSet;
		}
		
		public static function reabrirConta($numConta){
			//Criando driver e obtendo conexao
			$mySQLConfig = new MySQLConfig();
			$conn = $mySQLConfig->connect();
			
			// Reabrindo ContasCorrente
			$sql = "UPDATE ContaCorrente SET aberta = 1 WHERE numConta = ".$numConta.";";
			$resultSet = $conn->query($sql);
			$conn->close();
			return $resultSet;
		}
		
		public static function saque($numConta, $valor){
			//Criando driver e obtendo conexao
			$mySQLConfig = new MySQLConfig();
			$conn = $mySQLConfig->connect();
			
			// Criando nova Movimentacao
			$sql = "INSERT INTO Movimentacao (numConta,tipo,descricao,valor) VALUES (".$numConta.",'".TipoMovimento::$DEBITO."','Saque em C/C',".$valor.");";
			$resultSet = $conn->query($sql);
			$conn->close();
			return $resultSet;
		}
		
		public static function deposito($numConta, $valor){
			//Criando driver e obtendo conexao
			$mySQLConfig = new MySQLConfig();
			$conn = $mySQLConfig->connect();
			
			// Criando nova Movimentacao
			$sql = "INSERT INTO Movimentacao (numConta,tipo,descricao,valor) VALUES (".$numConta.",'".TipoMovimento::$CREDITO."','Deposito em C/C',".$valor.");";
			$resultSet = $conn->query($sql);
			$conn->close();
			return $resultSet;
		}
		
		public static function emitirSaldo($numConta){
			//Criando driver e obtendo conexao
			$mySQLConfig = new MySQLConfig();
			$conn = $mySQLConfig->connect();
			
			// buscar as ContasCorrentes do Banco
			$sql = "SELECT numConta,tipo,valor FROM Movimentacao WHERE numConta =".$numConta;
			$resultSet = $conn->query($sql);
			$conn->close(); 
			
			$Saldo = 0;
			if ($resultSet->num_rows > 0) {
				$resultado = mysqli_fetch_all($resultSet, MYSQLI_ASSOC);
				// Interagindo com resultado das listas de Contas
				foreach ($resultado as $linha) {
					if($linha["tipo"] === TipoMovimento::$CREDITO){
						$Saldo += $linha["valor"];
					}
					else {
						$Saldo -= $linha["valor"];
					}
				}
			}
			return $Saldo;
		}
		
		public static function emitirExtrato($numConta) : array {
			//Criando driver e obtendo conexao
			$mySQLConfig = new MySQLConfig();
			$conn = $mySQLConfig->connect();
			
			// buscar as ContasCorrentes do Banco
			$sql = "SELECT tipo, descricao, valor FROM Movimentacao WHERE numConta =".$numConta;
			$resultSet = $conn->query($sql);
			$resultado = mysqli_fetch_all($resultSet, MYSQLI_ASSOC);
			$conn->close(); 
			
			return $resultado;
		}
		
		public static function transferencia($numConta, $numContaDestino, $valor) : void{
			//Criando driver e obtendo conexao
			$mySQLConfig = new MySQLConfig();
			$conn = $mySQLConfig->connect();
			
			// Criando nova Movimentacao para Origem
			//$sql = "START TRANSACTION;";
			$sql1 = "INSERT INTO Movimentacao (numConta,tipo,descricao,valor) VALUES (".$numConta.",'".TipoMovimento::$DEBITO."','Transferencia entre C/C',".$valor.");";
			$sql2 = "INSERT INTO Movimentacao (numConta,tipo,descricao,valor) VALUES (".$numContaDestino.",'".TipoMovimento::$CREDITO."','Deposito de Transferencia entre C/C',".$valor.");";
			//$conn->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);
			$conn->query($sql1);
			$conn->query($sql2);
			//$conn->commit();
			
			$conn->close();
		}
		
	}
?>
