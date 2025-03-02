# Farma Transportes

## Sobre o Projeto
Farma Transportes é um sistema de gerenciamento de usuários, produtos e movimentações de estoque entre filiais, garantindo rastreabilidade e segurança na distribuição de produtos.

## Problema Resolvido
O sistema permite que filiais cadastrem produtos, gerenciem seus estoques e realizem movimentações seguras, garantindo que motoristas possam entregar produtos entre unidades. Ele também possui um controle de acesso para garantir que apenas usuários autorizados possam executar determinadas ações.

## Tecnologias Utilizadas
- **Backend:** Node.js com Express
- **Banco de Dados:** PostgreSQL com TypeORM
- **Autenticação:** JWT (JSON Web Token)
- **Hash de Senha:** Bcrypt

## Como Executar o Projeto
1. Clone este repositório:
   ```sh
   git clone git@github.com:andressasmedeiros/backend-farmacia-projeto02.git
   ```
2. Instale as dependências:
   ```sh
   cd backend-farmacia-projeto02
   npm install
   ```
3. Clone o arquivo .env-example e preencha as variáveis de ambiente

4. Rode as migrações:
   ```sh
   npx typeorm-ts-node-commonjs -d ./src/data-source.ts migration:run
   ```
5. Inicie o servidor:
   ```sh
   npm run start
   ```

## Melhorias Futuras
- Implementar testes automatizados
- Criar interface web para gestão
- Melhorar logs de auditoria e histórico de movimentações
- Ao finalizar a movimentação, atualizar um produto caso exista


