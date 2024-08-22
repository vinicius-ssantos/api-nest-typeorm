# Projeto NEST-BLOG

**Descrição**: Este projeto é uma aplicação desenvolvida utilizando o [NestJS](https://nestjs.com/), um framework Node.js progressivo para a construção de aplicações server-side eficientes e escaláveis. O objetivo desta aplicação é [descrição específica do que o projeto faz, ex: gerenciar ativos financeiros, etc.].

## Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
.
├── .env
├── .env.exemplo
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── src/
├── tsconfig.build.json
└── tsconfig.json
```

### Descrição dos Diretórios e Arquivos

- **.env**: Contém variáveis de ambiente que configuram o comportamento do projeto.
- **.env.exemplo**: Um exemplo do arquivo `.env`, útil para compartilhar com outros desenvolvedores as variáveis necessárias sem expor valores sensíveis.
- **.eslintrc.js**: Configuração do ESLint, usada para garantir a consistência do código.
- **.prettierrc**: Configuração do Prettier para formatação de código.
- **docker-compose.yml**: Arquivo de configuração do Docker Compose, utilizado para definir e orquestrar os serviços necessários para o ambiente de desenvolvimento, como banco de dados, cache, etc.
- **nest-cli.json**: Configuração do CLI do NestJS, que define como o projeto deve ser gerenciado e compilado.
- **package.json**: Lista as dependências do projeto e contém scripts úteis para desenvolvimento.
- **src/**: Diretório que contém o código-fonte da aplicação. Dentro dele, você encontrará módulos, controladores, serviços, e outros componentes fundamentais.
- **tsconfig.build.json** e **tsconfig.json**: Arquivos de configuração do TypeScript, que especificam como o código deve ser transpilado para JavaScript.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/vinicius-ssantos/api-nest-typeorm.git
   cd <nome-do-projeto>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
    - Renomeie o arquivo `.env.exemplo` para `.env`.
    - Preencha as variáveis conforme necessário.

4. Execute o projeto:
   ```bash
   npm run start:dev
   ```

## Uso do Docker

Para rodar a aplicação junto com seus serviços dependentes (como banco de dados) usando Docker, execute:

```bash
docker-compose up
```

Isso irá levantar os containers definidos no arquivo `docker-compose.yml`.

## Estrutura do Código

A estrutura do código dentro do diretório `src/` segue a organização padrão do NestJS:

- **Modules**: Cada módulo encapsula um conjunto de funcionalidades relacionadas.
- **Controllers**: Os controladores definem as rotas e lidam com as requisições HTTP.
- **Services**: Serviços contêm a lógica de negócio e são injetados nos controladores.
- **Entities**: Definições de entidades e modelos para interação com o banco de dados.

## Contribuição




Sinta-se à vontade para abrir issues e enviar pull requests. Certifique-se de seguir as boas práticas e garantir que todos os testes passem antes de submeter.

---

Este é um template inicial para o README. Você pode ajustar conforme as funcionalidades específicas do projeto forem sendo desenvolvidas e documentadas. Se precisar de mais detalhes ou alterações, estou à disposição para ajudar!