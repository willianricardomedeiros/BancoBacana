-- Criando Tabela ContaCorrente

CREATE TABLE ContaCorrente (
numConta INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
limite DECIMAL(19,2) NOT NULL,
aberta BOOLEAN NOT NULL
) 

-- Criando Tabela Movimentacao

CREATE TABLE Movimentacao (
id INT NOT NULL AUTO_INCREMENT,
numConta INT(6) NOT NULL,
data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
tipo VARCHAR(8) NOT NULL COMMENT 'Crédito ou Débito',
descricao VARCHAR(60) NOT NULL COMMENT 'Saque, Depósito ou Transferência',
valor DOUBLE NOT NULL,
PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COMMENT = 'Movimentação'

-- Inserts em ContaCorrente

INSERT INTO ContaCorrente (limite,aberta) VALUES (100 , 1);
INSERT INTO ContaCorrente (limite,aberta) VALUES (200 , 1);
INSERT INTO ContaCorrente (limite,aberta) VALUES (300 , 1);
INSERT INTO ContaCorrente (limite,aberta) VALUES (400 , 1);
INSERT INTO ContaCorrente (limite,aberta) VALUES (500 , False);

-- Inserts em Movimentacao

INSERT INTO Movimentacao (numConta,tipo,descricao,valor) VALUES (1, 'Credito' ,'Deposito em C/C', 10);
INSERT INTO Movimentacao (numConta,tipo,descricao,valor) VALUES (1, 'Credito' ,'Deposito em C/C', 15);

-- Consultas em Tabelas

SELECT * FROM ContaCorrente;
SELECT * FROM Movimentacao;

/*
ALTER TABLE ContaCorrente
MODIFY COLUMN aberta Boolean; 
*/
