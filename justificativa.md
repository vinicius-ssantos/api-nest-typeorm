# Projeto Nest-Blog

## Justificativa para o uso do TypeORM

### 1. **Mapeamento Objeto-Relacional (ORM)**
O TypeORM é um ORM (Object-Relational Mapping) que facilita a interação entre o código TypeScript/JavaScript e o banco de dados relacional. Ele permite trabalhar com tabelas e registros de forma orientada a objetos, o que melhora a legibilidade e a manutenção do código.

### 2. **Suporte a Múltiplos Bancos de Dados**
O TypeORM oferece suporte a diversos bancos de dados, incluindo MySQL, PostgreSQL, SQLite, SQL Server, e outros. Isso proporciona flexibilidade para escolher a melhor solução de banco de dados conforme as necessidades do projeto, além de facilitar a migração entre diferentes SGBDs.


### 3. **Migrations**
Com TypeORM, é possível gerenciar as alterações no banco de dados de forma segura e organizada por meio de migrations. Isso garante que a evolução do banco de dados seja controlada e que as alterações possam ser aplicadas e revertidas com facilidade.

### 4. **Validação e Transformação**
Combinado com bibliotecas como class-validator e class-transformer, o TypeORM permite a validação e transformação de dados diretamente nas entidades

