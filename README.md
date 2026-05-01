# Cadastro de Clientes Protheus

Frontend Angular com PO-UI para manutencao visual de clientes da tabela SA1 do Protheus.

## Objetivo

Este projeto sera uma aplicacao frontend-only para listar, visualizar e editar clientes usando dados dummy em memoria, com arquitetura preparada para integracao futura com API REST do Protheus.

## Stack Planejada

- Angular ~21.2.4
- TypeScript em modo estrito
- SCSS
- TOTVS PO-UI Components
- TOTVS PO-UI Templates
- Dados dummy nesta primeira fase

## Dependencias de UI

- @po-ui/ng-components: 21.12.0
- @po-ui/ng-templates: 21.12.0

## Ambiente Validado

- Node.js: v22.17.1
- npm: 10.9.2

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Suba a aplicacao em modo desenvolvimento:

```bash
npm start
```

Valide o build:

```bash
npm run build
```

## Status

Repositorio inicial criado, aplicacao Angular base gerada e PO-UI instalado. A implementacao seguira o roadmap descrito no `IDEA.MD`, uma fase por vez.
