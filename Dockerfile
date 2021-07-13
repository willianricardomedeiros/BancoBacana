FROM php:7.4-apache

# Inserção do arquivo de configuração do PHP (php.ini)
# Foi utilizada uma cópia de "php.ini-development" e habilitado o módulo (extensão) "pdo_mysql"
COPY ./php/php.ini /usr/local/etc/php/

# Instalação do módulo "mysqli" no "PHP".
RUN docker-php-ext-install mysqli 

# Instalar o módulo "pdo" e "pdo_mysql" necessario para acessar o banco pelo PHP
RUN docker-php-ext-install pdo pdo_mysql && docker-php-ext-enable pdo_mysql 
#&& docker-php-ext-configure pdo pdo_mysql 
#&& docker-php-ext-enable pdo_mysql

# Instalar o módulo "pdo_mysql" no "PHP"
#RUN docker-php-ext-configure pdo pdo_mysql && docker-php-ext-install pdo_mysql
