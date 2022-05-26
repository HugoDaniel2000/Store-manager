
## :dart: Projeto Store Manager

Projeto desenvolvido no módulo 23, durante o módulo de back-end no curso de desenvolvimento web da Trybe.

## :brain: Habilidades

Construir uma API :

- Construir uma API utilizando a arquitetura MSC
- Implementar teste unitários para aplicação 
- Contruir uma API no padrão RESTful 

## :wrench: O que foi desenvolvido 

Foi desenvolvido uma API que tem como objetivo gerenciar vendas.
Por meio dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados:
CRUD (_Create, Read, Update_ e _Delete_).

**⚠️ Atenção:**

- Não há front-end neste projeto;

Setar as variavéis de ambiente no arquivo .env:

```
  MYSQL_HOST
  MYSQL_USER
  MYSQL_PASSWORD
  PORT
```

 ## :dart: Instruções para visualizar o projeto:

Como baixar o projeto

Realizar o git clone: `git clone git@github.com:HugoDaniel2000/Store-manager.git`;

- Rodar o comando: `npm install`;

- Inicie o projeto com `npm start` ou `npm run dev`

- Rode os testes com `npm test` ou `npm run test:mocha`

**⚠️ Atenção:**

- Documentação da API: 
  - [Disponivel neste link](https://documenter.getpostman.com/view/20065093/Uz5ArySv)

## <strong>Tabelas</strong>

**⚠️ EXECUTE ESSE SCRIPT NO WORKBENCH OU EM ALGUM PROGRAMA SIMILAR **

O banco tem três tabelas: _products_, _sales_ e _sales\_products_.

```sql
DROP DATABASE IF EXISTS StoreManager;

CREATE DATABASE StoreManager;

USE StoreManager;

CREATE TABLE products (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales (
    id INT NOT NULL auto_increment,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (sale_id)
        REFERENCES sales (id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;
```


