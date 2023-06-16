# Fast-Shop

O Fast-Shop é um projeto desenvolvido em Vite com TypeScript, uma aplicação web para gerenciamento de vendas. O projeto é dividido em pastas principais e utiliza um backend em PHP com PostgreSQL como banco de dados. Neste documento, você encontrará informações sobre a arquitetura do projeto e instruções para configurar e executar a aplicação.

## Estrutura de Diretórios

O projeto Fast-Shop possui a seguinte estrutura de diretórios:

```
- backend/
  - classes/
    - saleHandler.php
  - migrations/
    - migrate.php
  - config/
    - connection.php
- src/
  - components/
  - pages/
- vite.config.js
- package.json
```

- A pasta `backend/` contém o código do backend da aplicação.
  - A pasta `classes/` contém os handlers responsáveis por realizar as consultas no banco de dados.
  - A pasta `migrations/` contém o arquivo `migrate.php`, utilizado para configurar a base de dados.
  - A pasta `config/` contém o arquivo `connection.php`, responsável por estabelecer a conexão com o banco de dados. **Lembre-se de configurar as credenciais de acesso corretamente nesse arquivo antes de executar a aplicação**.

- A pasta `src/` contém o código-fonte da aplicação frontend.
  - A pasta `components/` contém os componentes da aplicação.
  - A pasta `pages/` contém os arquivos `index.tsx`, que representam as páginas da aplicação.

## Executando a Aplicação

Siga as etapas abaixo para configurar e executar a aplicação:

1. Certifique-se de ter o PHP e o PostgreSQL instalados em seu ambiente de desenvolvimento.

2. No arquivo `backend/config/connection.php`, insira as credenciais corretas do seu banco de dados PostgreSQL.

3. Abra um terminal na raiz do projeto e execute o seguinte comando para instalar as dependências:

   ```bash
  yarn  && yarn build && npx vite preview
   ```

3. O build do projeto estará dentro da pasta:

   ```bash
  build
   ```

5. Em seguida, execute o comando abaixo para iniciar o servidor de desenvolvimento:

  ```bash
  php -S localhost:8080 
   ```

## Realizando Migrações

Para configurar a base de dados do projeto, siga as etapas abaixo:

1. Certifique-se de ter configurado corretamente as credenciais de acesso ao banco de dados no arquivo `backend/config/connection.php`.

2. Abra um terminal na raiz do projeto e execute o seguinte comando para realizar as migrações:

   ```bash
   php backend/migrations/migrate.php
   ```

   Esse comando criará as tabelas necessárias no banco de dados.

