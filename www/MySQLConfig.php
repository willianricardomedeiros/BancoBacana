<?php
	class MySQLConfig {
		//private $servername = "localhost";
		//private $username = "banco";
		//private $password = "banco";
		private $servername = "db";
		private $username = "root";
		private $password = "root";
		private $dbname = "banco_bd";
	
		public function connect() {
			// Criando connection
			$conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
			// Verificando connection
			if ($conn->connect_error) {
			  die("Connection failed: " . $conn->connect_error);
			}
			return $conn;
		}
		
	}
?>
