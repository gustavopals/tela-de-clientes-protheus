# IDEA.MD — Frontend Angular + PO-UI para Cadastro de Clientes Protheus SA1

## 1. Visão geral do projeto

Este projeto tem como objetivo construir uma aplicação **frontend-only** em **Angular `~21.2.4`** utilizando ao máximo a biblioteca **TOTVS PO-UI** para criar uma interface moderna, padronizada e preparada para integração futura com uma API REST do **Protheus**.

A primeira entrega será um CRUD visual de clientes da tabela **SA1 — Cadastro de Clientes** do Protheus, contemplando:

- Tela de **listagem** de clientes.
- Tela de **visualização/detalhe** do cliente.
- Tela de **edição** do cliente.
- Dados **dummy/mockados** enquanto a API REST do Protheus ainda não estiver pronta.
- Arquitetura preparada para trocar o repositório dummy por um repositório HTTP futuramente, sem reescrever as telas.

O projeto deve ser desenvolvido com apoio do **Codex**, usando este documento como guia principal de implementação, divisão de fases, tarefas e subtarefas.

---

## 2. Stack definida

### 2.1. Tecnologias principais

- **Node.js:** `v22.17.1`
- **Angular:** `~21.2.4`
- **TypeScript:** compatível com Angular 21, preferencialmente `~5.9.x`
- **RxJS:** `~7.8.x`
- **PO-UI Components:** `@po-ui/ng-components`
- **PO-UI Templates:** `@po-ui/ng-templates`
- **Estilo:** SCSS
- **Roteamento:** Angular Router
- **Formulários:** Angular Reactive Forms tipados
- **Estado de tela:** Signals do Angular para estado local simples; RxJS para fluxos assíncronos quando necessário
- **Backend nesta fase:** inexistente; usar dados dummy em memória

### 2.2. Compatibilidade validada

- O Angular 21 exige Node nas faixas `^20.19.0`, `^22.12.0` ou `^24.0.0`. Portanto, o Node `v22.17.1` está compatível.
- A documentação atual do PO-UI já referencia Angular `~21.2.4` como dependência compatível para a versão atual da biblioteca.

---

## 3. Objetivo funcional

Construir uma interface de manutenção de clientes do Protheus com base na tabela **SA1**, permitindo ao usuário:

1. Acessar uma listagem de clientes.
2. Pesquisar clientes por código, loja, razão social, nome fantasia, CPF/CNPJ, UF e status de bloqueio.
3. Visualizar os dados completos de um cliente.
4. Editar dados cadastrais, endereço, contato, dados comerciais/financeiros e status.
5. Validar campos obrigatórios e formatos principais.
6. Simular operações de consulta e alteração com dados dummy.
7. Preparar a aplicação para futura conexão com endpoints REST reais do Protheus.

---

## 4. Escopo da primeira versão

### 4.1. Incluído no escopo

- Criar repositório do zero.
- Criar projeto Angular com roteamento, SCSS e modo estrito.
- Instalar e configurar PO-UI.
- Montar layout base com menu lateral e toolbar.
- Criar feature `clientes`.
- Criar model TypeScript da tabela SA1.
- Criar base dummy de clientes.
- Criar serviço/repositório dummy.
- Criar estrutura preparada para futuro repositório HTTP.
- Criar tela de listagem.
- Criar tela de visualização.
- Criar tela de edição.
- Criar validações frontend.
- Criar tratamento de loading, vazio e erro simulado.
- Criar documentação técnica básica no próprio repositório.
- Criar roadmap detalhado para execução com Codex.

### 4.2. Fora do escopo nesta fase

- Desenvolvimento da API REST no Protheus.
- Desenvolvimento AdvPL/TLPP.
- Autenticação real.
- Controle real de permissões.
- Persistência real em banco de dados.
- Inclusão real no Protheus.
- Exclusão lógica real no Protheus.
- Integração com SE4, SA3 e SA4.
- Validação real via funções Protheus `CPF()`, `CNPJ()` ou consultas em tabelas auxiliares.
- Deploy produtivo.

---

## 5. Nome sugerido do projeto

Nome técnico recomendado:

```bash
protheus-sa1-clientes-frontend
```

Nome exibido na aplicação:

```text
Cadastro de Clientes Protheus
```

---

## 6. Premissas do projeto

1. O projeto será exclusivamente frontend nesta fase.
2. A API REST do Protheus será criada futuramente.
3. A chave única do cliente será composta por:

```text
A1_FILIAL + A1_COD + A1_LOJA
```

4. As telas devem ser desenvolvidas com dados dummy, mas simulando o comportamento esperado da API real.
5. O código deve ser organizado para permitir troca simples entre:
   - `ClienteDummyRepository`
   - `ClienteHttpRepository`
6. O layout deve priorizar PO-UI, customizando apenas quando necessário.
7. A aplicação deve estar pronta para evoluir para POST, PUT e DELETE futuramente.
8. O frontend deve respeitar os nomes reais dos campos Protheus, mas pode usar labels amigáveis em tela.

---

## 7. Regras de negócio consideradas

### 7.1. Chave composta

A identificação única de um cliente será feita por:

```text
A1_FILIAL + A1_COD + A1_LOJA
```

No frontend, essa chave deve ser tratada explicitamente.

Exemplo de chave calculada:

```ts
export function buildClienteKey(cliente: Pick<Sa1Cliente, 'A1_FILIAL' | 'A1_COD' | 'A1_LOJA'>): string {
  return `${cliente.A1_FILIAL}-${cliente.A1_COD}-${cliente.A1_LOJA}`;
}
```

### 7.2. Registro ativo

No Protheus, a exclusão lógica normalmente é controlada pelo campo padrão:

```text
D_E_L_E_T_
```

Nesta fase frontend, o campo poderá existir apenas no mock para simular registros ativos/inativos, mas a listagem deve exibir somente registros ativos por padrão.

### 7.3. Bloqueio do cliente

Campo:

```text
A1_MSBLQL
```

Regra:

- `1` = Sim / bloqueado
- `2` = Não / desbloqueado

Na tela, exibir como tag visual:

- Bloqueado
- Ativo

### 7.4. Campos mínimos obrigatórios para futura inclusão

Mesmo que a primeira versão foque em edição, o formulário deve considerar os obrigatórios mínimos para POST futuro:

- `A1_COD`
- `A1_LOJA`
- `A1_NOME`
- `A1_CGC`
- `A1_TIPO`
- `A1_EST`
- `A1_COND`

### 7.5. Validações frontend iniciais

Validações mínimas:

- `A1_FILIAL`: obrigatório, tamanho máximo 2.
- `A1_COD`: obrigatório, tamanho máximo 6.
- `A1_LOJA`: obrigatório, tamanho máximo 2.
- `A1_NOME`: obrigatório, tamanho máximo 40.
- `A1_NREDUZ`: tamanho máximo 20.
- `A1_CGC`: obrigatório, aceitar CPF ou CNPJ, tamanho máximo 14, armazenar preferencialmente apenas números.
- `A1_TIPO`: obrigatório, valores `F` ou `J`.
- `A1_EST`: obrigatório, tamanho 2.
- `A1_EMAIL`: validar formato de e-mail quando preenchido.
- `A1_CEP`: tamanho máximo 8, preferencialmente apenas números.
- `A1_COND`: obrigatório, tamanho máximo 3.
- Campos numéricos: aceitar apenas número e tratar casas decimais quando fizer sentido.

Observação: validações definitivas de CPF/CNPJ, vendedor, condição de pagamento e transportadora serão confirmadas pela API REST no futuro.

---

## 8. Estrutura de campos da SA1 no frontend

### 8.1. Interface principal

Criar o arquivo:

```text
src/app/features/clientes/models/sa1-cliente.model.ts
```

Conteúdo esperado:

```ts
export type TipoPessoaProtheus = 'F' | 'J';
export type SimNaoProtheus = 'S' | 'N';
export type BloqueioProtheus = '1' | '2';
export type RiscoCliente = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Sa1Cliente {
  A1_FILIAL: string;
  A1_COD: string;
  A1_LOJA: string;

  A1_NOME: string;
  A1_NREDUZ: string;
  A1_PESSOA: string;
  A1_TIPO: TipoPessoaProtheus;
  A1_CGC: string;
  A1_INSCR: string;
  A1_INSCRM: string;
  A1_PFISICA: SimNaoProtheus;
  A1_CONTATO: string;

  A1_END: string;
  A1_BAIRRO: string;
  A1_MUN: string;
  A1_COD_MUN: string;
  A1_EST: string;
  A1_ESTADO: string;
  A1_CEP: string;
  A1_PAIS: string;
  A1_PAISDES: string;
  A1_IBGE: string;
  A1_REGIAO: string;
  A1_DSCREG: string;

  A1_TEL: string;
  A1_FAX: string;
  A1_DDI: string;
  A1_DDD: string;
  A1_EMAIL: string;
  A1_TELEX: string;

  A1_VEND: string;
  A1_COMIS: number;
  A1_COND: string;
  A1_TABELA: string;
  A1_DESC: number;
  A1_LC: number;
  A1_LCFIN: number;
  A1_MOEDALC: string;
  A1_RISCO: RiscoCliente;
  A1_CLASSE: string;
  A1_CLASVEN: string;
  A1_PRIOR: string;
  A1_NATUREZ: string;
  A1_TRANSP: string;
  A1_TPFRET: string;

  A1_MSBLQL: BloqueioProtheus;
  A1_MSALDO: number;
  A1_MCOMPRA: number;
  A1_ULTCOM: string | null;
  A1_PRICOM: string | null;
  A1_NROCOM: number;

  D_E_L_E_T_?: string;
}
```

### 8.2. Modelo para listagem

Criar também uma interface reduzida para listagem, evitando renderizar todos os campos na tabela:

```ts
export interface Sa1ClienteListItem {
  key: string;
  A1_FILIAL: string;
  A1_COD: string;
  A1_LOJA: string;
  A1_NOME: string;
  A1_NREDUZ: string;
  A1_TIPO: TipoPessoaProtheus;
  A1_CGC: string;
  A1_EST: string;
  A1_MUN: string;
  A1_EMAIL: string;
  A1_MSBLQL: BloqueioProtheus;
  A1_LC: number;
  A1_MSALDO: number;
}
```

---

## 9. Estrutura recomendada de pastas

```text
protheus-sa1-clientes-frontend/
├─ .vscode/
│  ├─ extensions.json
│  └─ settings.json
├─ docs/
│  ├─ API-FUTURA.md
│  ├─ CONVENCOES.md
│  └─ PROMPTS-CODEX.md
├─ src/
│  ├─ app/
│  │  ├─ app.config.ts
│  │  ├─ app.routes.ts
│  │  ├─ app.component.ts
│  │  ├─ app.component.html
│  │  ├─ app.component.scss
│  │  ├─ core/
│  │  │  ├─ config/
│  │  │  │  └─ app-environment.model.ts
│  │  │  ├─ constants/
│  │  │  │  └─ app-routes.constant.ts
│  │  │  ├─ interceptors/
│  │  │  │  └─ api-error.interceptor.ts
│  │  │  └─ services/
│  │  │     └─ notification.service.ts
│  │  ├─ shared/
│  │  │  ├─ components/
│  │  │  │  ├─ empty-state/
│  │  │  │  └─ page-loading/
│  │  │  ├─ helpers/
│  │  │  │  ├─ document-mask.helper.ts
│  │  │  │  └─ protheus-key.helper.ts
│  │  │  └─ validators/
│  │  │     ├─ cpf-cnpj.validator.ts
│  │  │     └─ protheus-field-length.validator.ts
│  │  └─ features/
│  │     └─ clientes/
│  │        ├─ clientes.routes.ts
│  │        ├─ components/
│  │        │  ├─ cliente-form/
│  │        │  ├─ cliente-status-tag/
│  │        │  └─ cliente-summary-card/
│  │        ├─ data/
│  │        │  ├─ cliente-dummy.repository.ts
│  │        │  ├─ cliente-http.repository.ts
│  │        │  ├─ cliente.repository.ts
│  │        │  └─ clientes.mock.ts
│  │        ├─ mappers/
│  │        │  └─ cliente.mapper.ts
│  │        ├─ models/
│  │        │  ├─ sa1-cliente.model.ts
│  │        │  ├─ cliente-filter.model.ts
│  │        │  └─ cliente-api-contract.model.ts
│  │        ├─ pages/
│  │        │  ├─ cliente-list-page/
│  │        │  ├─ cliente-detail-page/
│  │        │  └─ cliente-edit-page/
│  │        └─ utils/
│  │           └─ cliente-labels.util.ts
│  ├─ assets/
│  ├─ environments/
│  │  ├─ environment.ts
│  │  └─ environment.development.ts
│  └─ styles.scss
├─ .editorconfig
├─ .eslint.config.js
├─ .gitignore
├─ .prettierrc
├─ angular.json
├─ package.json
├─ README.md
└─ IDEA.MD
```

---

## 10. Arquitetura proposta

### 10.1. Princípio central

Separar claramente:

- **Tela**: componentes e páginas Angular.
- **Domínio**: modelos e regras simples da SA1.
- **Dados**: repositório dummy agora, repositório HTTP depois.
- **Infraestrutura**: interceptors, environment e notificações.

A UI não deve saber se os dados vêm de mock ou API REST. Ela deve consumir uma abstração.

### 10.2. Contrato de repositório

Criar arquivo:

```text
src/app/features/clientes/data/cliente.repository.ts
```

Exemplo:

```ts
import { Observable } from 'rxjs';
import { Sa1Cliente, Sa1ClienteListItem } from '../models/sa1-cliente.model';
import { ClienteFilter } from '../models/cliente-filter.model';

export abstract class ClienteRepository {
  abstract list(filter: ClienteFilter): Observable<Sa1ClienteListItem[]>;
  abstract getByKey(filial: string, cod: string, loja: string): Observable<Sa1Cliente | null>;
  abstract update(cliente: Sa1Cliente): Observable<Sa1Cliente>;
}
```

### 10.3. Repositório dummy

Criar arquivo:

```text
src/app/features/clientes/data/cliente-dummy.repository.ts
```

Responsabilidades:

- Manter array de clientes em memória.
- Simular delay com `delay(300)` ou `timer`.
- Filtrar clientes ativos.
- Aplicar filtros de busca.
- Buscar por chave composta.
- Atualizar registro em memória.
- Retornar erro simulado quando a chave não existir.

### 10.4. Repositório HTTP futuro

Criar arquivo placeholder:

```text
src/app/features/clientes/data/cliente-http.repository.ts
```

Não implementar integração real agora. Apenas deixar estrutura preparada.

Endpoints futuros previstos:

```http
GET    /api/clientes
GET    /api/clientes/{cod}/{loja}
POST   /api/clientes
PUT    /api/clientes/{cod}/{loja}
DELETE /api/clientes/{cod}/{loja}
```

Observação importante: mesmo que a filial não apareça na rota sugerida, ela deverá ser considerada pelo backend via `xFilial("SA1")`, header, contexto de sessão ou parâmetro, conforme padrão que for definido no Protheus.

---

## 11. Estratégia de dados dummy

Criar o arquivo:

```text
src/app/features/clientes/data/clientes.mock.ts
```

A base dummy deve conter no mínimo 12 clientes com variações:

- Pessoa física.
- Pessoa jurídica.
- Clientes bloqueados.
- Clientes ativos.
- Diferentes UFs.
- Clientes com limite de crédito alto, baixo e zerado.
- Clientes com saldo devedor.
- Clientes sem e-mail.
- Clientes com última compra preenchida e sem última compra.

Exemplo de item:

```ts
export const CLIENTES_MOCK: Sa1Cliente[] = [
  {
    A1_FILIAL: '01',
    A1_COD: '000001',
    A1_LOJA: '01',
    A1_NOME: 'MAKITA COMERCIO DE FERRAMENTAS LTDA',
    A1_NREDUZ: 'MAKITA FERRAMENTAS',
    A1_PESSOA: 'J',
    A1_TIPO: 'J',
    A1_CGC: '12345678000190',
    A1_INSCR: '123456789',
    A1_INSCRM: '',
    A1_PFISICA: 'N',
    A1_CONTATO: 'Carlos Silva',
    A1_END: 'Rua Exemplo, 100',
    A1_BAIRRO: 'Centro',
    A1_MUN: 'Ponta Grossa',
    A1_COD_MUN: '4119905',
    A1_EST: 'PR',
    A1_ESTADO: 'Paraná',
    A1_CEP: '84000000',
    A1_PAIS: '105',
    A1_PAISDES: 'Brasil',
    A1_IBGE: '4119905',
    A1_REGIAO: '01',
    A1_DSCREG: 'Sul',
    A1_TEL: '4232220000',
    A1_FAX: '',
    A1_DDI: '55',
    A1_DDD: '42',
    A1_EMAIL: 'cliente@exemplo.com.br',
    A1_TELEX: '',
    A1_VEND: '000001',
    A1_COMIS: 2.5,
    A1_COND: '001',
    A1_TABELA: '001',
    A1_DESC: 0,
    A1_LC: 50000,
    A1_LCFIN: 50000,
    A1_MOEDALC: '01',
    A1_RISCO: 'A',
    A1_CLASSE: 'A',
    A1_CLASVEN: '1',
    A1_PRIOR: '1',
    A1_NATUREZ: '101010',
    A1_TRANSP: '000001',
    A1_TPFRET: 'C',
    A1_MSBLQL: '2',
    A1_MSALDO: 1250.75,
    A1_MCOMPRA: 98500.25,
    A1_ULTCOM: '2026-04-15',
    A1_PRICOM: '2023-01-10',
    A1_NROCOM: 35,
    D_E_L_E_T_: ' '
  }
];
```

---

## 12. Telas do sistema

## 12.1. Tela de listagem de clientes

### Rota

```text
/clientes
```

### Objetivo

Exibir uma tabela consultável de clientes da SA1.

### Componentes PO-UI recomendados

- `po-page-default`
- `po-breadcrumb`
- `po-table`
- `po-button`
- `po-input`
- `po-select`
- `po-divider`
- `po-tag`
- `po-loading-overlay`
- `po-notification`

### Campos na tabela

Colunas recomendadas:

| Campo | Label | Observação |
|---|---|---|
| `A1_FILIAL` | Filial | Parte da chave |
| `A1_COD` | Código | Parte da chave |
| `A1_LOJA` | Loja | Parte da chave |
| `A1_NOME` | Razão Social | Principal |
| `A1_NREDUZ` | Nome Fantasia | Secundário |
| `A1_TIPO` | Tipo | Física/Jurídica |
| `A1_CGC` | CPF/CNPJ | Exibir formatado |
| `A1_EST` | UF | Estado |
| `A1_MUN` | Município | Cidade |
| `A1_EMAIL` | E-mail | Comunicação |
| `A1_MSBLQL` | Status | Tag Ativo/Bloqueado |
| `A1_LC` | Limite Crédito | Moeda |
| `A1_MSALDO` | Saldo Devedor | Moeda |

### Filtros recomendados

- Busca geral: código, razão social, nome fantasia ou CPF/CNPJ.
- Filial.
- UF.
- Tipo de pessoa.
- Status de bloqueio.

### Ações da tabela

- **Visualizar**: direciona para `/clientes/:filial/:cod/:loja`.
- **Editar**: direciona para `/clientes/:filial/:cod/:loja/editar`.
- **Limpar filtros**.
- Futuro: **Novo cliente**.

### Regras da listagem

1. Carregar dados dummy ao abrir a tela.
2. Exibir loading durante carregamento.
3. Exibir estado vazio quando nenhum cliente for encontrado.
4. Formatar CPF/CNPJ visualmente, sem alterar valor interno.
5. Exibir status com tag.
6. Não exibir registros com `D_E_L_E_T_` diferente de espaço.
7. Não fazer chamada HTTP real nesta fase.

---

## 12.2. Tela de visualização do cliente

### Rota

```text
/clientes/:filial/:cod/:loja
```

### Objetivo

Exibir os dados completos de um cliente em modo somente leitura.

### Componentes PO-UI recomendados

- `po-page-default`
- `po-breadcrumb`
- `po-info`
- `po-tag`
- `po-divider`
- `po-button`
- `po-loading-overlay`
- `po-container`

### Organização visual

Separar os dados em blocos:

1. **Identificação / Chave**
2. **Dados cadastrais**
3. **Endereço**
4. **Contato / Comunicação**
5. **Comercial / Financeiro**
6. **Controle / Status**

### Ações

- Voltar para listagem.
- Editar cliente.

### Regras

1. Buscar cliente pelo trio `filial`, `cod`, `loja`.
2. Se não encontrar, exibir notificação e voltar para listagem ou mostrar tela de erro amigável.
3. Não permitir alteração de dados nesta tela.
4. Exibir campos calculados como somente leitura.

---

## 12.3. Tela de edição do cliente

### Rota

```text
/clientes/:filial/:cod/:loja/editar
```

### Objetivo

Permitir edição dos dados do cliente em formulário dividido por seções.

### Componentes PO-UI recomendados

- `po-page-default`
- `po-breadcrumb`
- `po-input`
- `po-select`
- `po-datepicker`
- `po-decimal`
- `po-switch` ou `po-select` para bloqueio
- `po-divider`
- `po-button`
- `po-modal`
- `po-notification`
- `po-loading-overlay`

### Campos editáveis

#### Identificação / Chave

Na edição, os campos de chave devem ser somente leitura:

- `A1_FILIAL`
- `A1_COD`
- `A1_LOJA`

#### Dados cadastrais

- `A1_NOME`
- `A1_NREDUZ`
- `A1_PESSOA`
- `A1_TIPO`
- `A1_CGC`
- `A1_INSCR`
- `A1_INSCRM`
- `A1_PFISICA`
- `A1_CONTATO`

#### Endereço

- `A1_END`
- `A1_BAIRRO`
- `A1_MUN`
- `A1_COD_MUN`
- `A1_EST`
- `A1_ESTADO`
- `A1_CEP`
- `A1_PAIS`
- `A1_PAISDES`
- `A1_IBGE`
- `A1_REGIAO`
- `A1_DSCREG`

#### Contato / Comunicação

- `A1_TEL`
- `A1_FAX`
- `A1_DDI`
- `A1_DDD`
- `A1_EMAIL`
- `A1_TELEX`

#### Comercial / Financeiro

- `A1_VEND`
- `A1_COMIS`
- `A1_COND`
- `A1_TABELA`
- `A1_DESC`
- `A1_LC`
- `A1_LCFIN`
- `A1_MOEDALC`
- `A1_RISCO`
- `A1_CLASSE`
- `A1_CLASVEN`
- `A1_PRIOR`
- `A1_NATUREZ`
- `A1_TRANSP`
- `A1_TPFRET`

#### Controle / Status

Campos calculados devem ser somente leitura:

- `A1_MSALDO`
- `A1_MCOMPRA`
- `A1_ULTCOM`
- `A1_PRICOM`
- `A1_NROCOM`

Campo editável:

- `A1_MSBLQL`

### Ações

- Salvar.
- Cancelar.
- Voltar.

### Regras da edição

1. Ao abrir, buscar dados pelo trio `filial`, `cod`, `loja`.
2. Montar formulário tipado.
3. Campos obrigatórios devem bloquear o salvamento.
4. Ao salvar, atualizar mock em memória.
5. Exibir notificação de sucesso.
6. Após salvar, redirecionar para tela de visualização.
7. Ao cancelar com formulário alterado, exibir modal de confirmação.
8. Não chamar API real nesta fase.

---

## 13. Contrato futuro da API REST

### 13.1. Listagem

```http
GET /api/clientes?search=&filial=01&uf=PR&tipo=J&bloqueado=2
```

Resposta sugerida:

```json
{
  "items": [
    {
      "A1_FILIAL": "01",
      "A1_COD": "000001",
      "A1_LOJA": "01",
      "A1_NOME": "CLIENTE EXEMPLO LTDA",
      "A1_NREDUZ": "CLIENTE EXEMPLO",
      "A1_TIPO": "J",
      "A1_CGC": "12345678000190",
      "A1_EST": "PR",
      "A1_MUN": "Ponta Grossa",
      "A1_EMAIL": "cliente@exemplo.com.br",
      "A1_MSBLQL": "2",
      "A1_LC": 50000,
      "A1_MSALDO": 1250.75
    }
  ],
  "hasNext": false
}
```

### 13.2. Detalhe

```http
GET /api/clientes/{cod}/{loja}
```

Resposta:

```json
{
  "A1_FILIAL": "01",
  "A1_COD": "000001",
  "A1_LOJA": "01",
  "A1_NOME": "CLIENTE EXEMPLO LTDA"
}
```

### 13.3. Alteração

```http
PUT /api/clientes/{cod}/{loja}
```

Payload:

```json
{
  "A1_NOME": "CLIENTE EXEMPLO LTDA",
  "A1_NREDUZ": "CLIENTE EXEMPLO",
  "A1_EMAIL": "cliente@exemplo.com.br",
  "A1_MSBLQL": "2"
}
```

### 13.4. Exclusão lógica futura

```http
DELETE /api/clientes/{cod}/{loja}
```

A API deve aplicar exclusão lógica no Protheus, não exclusão física.

### 13.5. Observações Protheus para backend futuro

1. Sempre considerar filial via `xFilial("SA1")`.
2. Sempre filtrar registros ativos:

```advpl
SA1->D_E_L_E_T_ == " "
```

3. Validar `A1_CGC` com regra de CPF/CNPJ.
4. Validar `A1_COND` na SE4.
5. Validar `A1_VEND` na SA3.
6. Validar `A1_TRANSP` na SA4.
7. Retornar erros de validação em formato padronizado para o frontend.

---

## 14. Padrões de desenvolvimento

### 14.1. Convenções gerais

- Usar nomes de arquivos em kebab-case.
- Usar classes e interfaces com nomes claros.
- Usar models específicos para contratos.
- Evitar lógica de negócio pesada dentro de componentes.
- Separar componentes burros de páginas quando fizer sentido.
- Evitar `any`.
- Evitar strings mágicas espalhadas.
- Centralizar labels e opções de select.
- Não misturar mock diretamente nas páginas.

### 14.2. Padrão de componentes

Páginas:

```text
cliente-list-page
cliente-detail-page
cliente-edit-page
```

Componentes reutilizáveis:

```text
cliente-form
cliente-status-tag
cliente-summary-card
```

### 14.3. Padrão de estado

Usar signals para estado local:

```ts
readonly loading = signal(false);
readonly clientes = signal<Sa1ClienteListItem[]>([]);
readonly error = signal<string | null>(null);
```

Usar RxJS para operações do repositório:

```ts
this.repository.list(filter).subscribe(...);
```

Ou, quando apropriado, converter Observable para signal com APIs oficiais do Angular.

### 14.4. Padrão de erro

Criar mensagens amigáveis:

- Cliente não encontrado.
- Não foi possível carregar os clientes.
- Não foi possível salvar o cliente.
- Cliente salvo com sucesso.

Nesta fase, erros podem ser simulados no dummy repository.

---

## 15. Scripts recomendados no package.json

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

---

## 16. Comandos de criação do projeto

### 16.1. Validar ambiente

```bash
node -v
npm -v
```

Esperado:

```text
node v22.17.1
```

### 16.2. Criar projeto Angular

Opção recomendada usando versão específica do CLI:

```bash
npx -p @angular/cli@21.2.4 ng new protheus-sa1-clientes-frontend --routing --style=scss --strict --standalone=false
```

Entrar na pasta:

```bash
cd protheus-sa1-clientes-frontend
```

### 16.3. Instalar dependências

```bash
npm install
```

### 16.4. Adicionar PO-UI Components

```bash
ng add @po-ui/ng-components
```

Quando o CLI perguntar se deseja incluir estrutura inicial com menu lateral, página e toolbar, responder `Y` se quiser acelerar a montagem do layout base.

### 16.5. Adicionar PO-UI Templates

```bash
ng add @po-ui/ng-templates
```

### 16.6. Rodar aplicação

```bash
npm start
```

Acessar:

```text
http://localhost:4200
```

### 16.7. Adicionar ESLint

```bash
ng add angular-eslint
```

### 16.8. Adicionar Prettier

```bash
npm install -D prettier eslint-config-prettier
```

Criar `.prettierrc`:

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 120,
  "trailingComma": "none"
}
```

---

## 17. Estratégia para uso com Codex

## 17.1. Regra principal

Sempre pedir ao Codex para implementar **uma fase por vez**, validando build/lint/test a cada fase.

Evitar prompts gigantes pedindo o sistema inteiro em uma única execução.

## 17.2. Prompt base para o Codex

```text
Leia o arquivo IDEA.MD inteiro antes de alterar código.
Implemente somente a fase [NOME_DA_FASE] do roadmap.
Respeite a arquitetura, nomes de pastas, padrões de código e limitações descritas.
Não implemente backend real.
Use dados dummy conforme especificado.
Use Angular ~21.2.4, TypeScript estrito, SCSS e PO-UI.
Ao final, rode ou informe os comandos de validação: npm run build, npm run lint e npm test quando aplicável.
Explique objetivamente os arquivos criados/alterados.
```

## 17.3. Prompt para revisão de código

```text
Revise a implementação atual comparando com o IDEA.MD.
Verifique se há violações de arquitetura, duplicação, uso de any, excesso de lógica em componentes, problemas de tipagem, problemas de UX com PO-UI ou acoplamento indevido ao mock.
Não altere o código ainda. Primeiro liste os problemas encontrados e proponha correções organizadas por prioridade.
```

## 17.4. Prompt para refatoração

```text
Com base na revisão anterior, aplique apenas as correções de prioridade alta.
Mantenha o comportamento atual.
Não adicione novas features.
Garanta que build e lint continuem passando.
```

## 17.5. Prompt para testes

```text
Crie testes unitários para a feature clientes, priorizando repository dummy, helpers de chave composta, validators e comportamento básico das páginas.
Não altere regras funcionais.
Não implemente testes end-to-end nesta fase.
```

---

# 18. Roadmap detalhado de desenvolvimento

## Fase 0 — Preparação do repositório

### Objetivo

Criar a base do repositório e garantir que o ambiente local esteja pronto.

### Tasks

#### 0.1. Criar repositório

- [x] Criar repositório Git com nome `protheus-sa1-clientes-frontend`.
- [x] Inicializar README básico.
- [x] Criar branch principal `main`.
- [x] Criar branch de desenvolvimento `develop`, se esse for o fluxo desejado.

#### 0.2. Validar Node e npm

- [x] Executar `node -v`.
- [x] Confirmar `v22.17.1`.
- [x] Executar `npm -v`.
- [x] Registrar versões no README.

#### 0.3. Criar arquivo IDEA.MD

- [x] Salvar este documento na raiz do repositório.
- [x] Garantir que o Codex sempre consulte este arquivo antes de implementar.

### Critério de aceite

- [x] Repositório criado.
- [x] IDEA.MD salvo na raiz.
- [x] Ambiente Node validado.

---

## Fase 1 — Criação do projeto Angular

### Objetivo

Criar aplicação Angular limpa, com roteamento, SCSS e strict mode.

### Tasks

#### 1.1. Gerar projeto

Executar:

```bash
npx -p @angular/cli@21.2.4 ng new protheus-sa1-clientes-frontend --routing --style=scss --strict --standalone=false
```

- [x] Projeto Angular gerado com roteamento, SCSS e strict mode.

#### 1.2. Entrar no projeto

```bash
cd protheus-sa1-clientes-frontend
```

- [x] Estrutura do projeto posicionada em `/opt/tela-de-clientes-protheus`.

#### 1.3. Subir aplicação inicial

```bash
npm start
```

- [x] Aplicação inicial validada em `http://127.0.0.1:4200/`.

#### 1.4. Validar build

```bash
npm run build
```

- [x] Build inicial executado sem erro.

### Critério de aceite

- [x] Angular rodando em `http://localhost:4200`.
- [x] Build inicial executado sem erro.

---

## Fase 2 — Instalação e configuração do PO-UI

### Objetivo

Adicionar PO-UI Components e PO-UI Templates ao projeto.

### Tasks

#### 2.1. Instalar components

```bash
ng add @po-ui/ng-components
```

Subtasks:

- [x] Aceitar configuração de tema.
- [x] Aceitar estrutura inicial com menu/toolbar se perguntado.
- [x] Confirmar imports adicionados.

#### 2.2. Instalar templates

```bash
ng add @po-ui/ng-templates
```

Subtasks:

- [x] Confirmar instalação do pacote.
- [x] Confirmar configuração do módulo/template.

#### 2.3. Testar aplicação

```bash
npm start
```

- [x] Aplicação validada com `npm start` e resposta HTTP 200.

#### 2.4. Corrigir eventuais conflitos de dependência

- [x] Verificar `package.json`.
- [x] Confirmar Angular `~21.2.4`.
- [x] Confirmar TypeScript `~5.9.x`.
- [x] Confirmar RxJS `~7.8.x`.

### Critério de aceite

- [x] PO-UI instalado.
- [x] Aplicação sobe sem erro.
- [x] Tema PO-UI aplicado.

---

## Fase 3 — Configuração de qualidade de código

### Objetivo

Padronizar lint, formatação e configurações do editor.

### Tasks

#### 3.1. Instalar ESLint

```bash
ng add angular-eslint
```

#### 3.2. Instalar Prettier

```bash
npm install -D prettier eslint-config-prettier
```

#### 3.3. Criar `.prettierrc`

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 120,
  "trailingComma": "none"
}
```

#### 3.4. Criar `.vscode/settings.json`

Configurações sugeridas:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

#### 3.5. Criar `.vscode/extensions.json`

Recomendar extensões:

```json
{
  "recommendations": [
    "angular.ng-template",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
```

#### 3.6. Ajustar scripts

Adicionar scripts de lint e format no `package.json`.

### Critério de aceite

- `npm run lint` funciona.
- `npm run format:check` funciona.
- Projeto mantém estilo consistente.

---

## Fase 4 — Layout base da aplicação

### Objetivo

Criar estrutura visual principal com PO-UI.

### Tasks

#### 4.1. Criar layout com toolbar e menu

Componentes:

- `po-toolbar`
- `po-menu`
- `router-outlet`

#### 4.2. Configurar menu

Itens:

- Dashboard futuro, se desejado.
- Clientes.

Inicialmente:

```ts
readonly menus: PoMenuItem[] = [
  { label: 'Clientes', link: '/clientes', icon: 'po-icon-users' }
];
```

#### 4.3. Configurar rota raiz

- `/` redireciona para `/clientes`.
- Rota wildcard redireciona para `/clientes` ou tela 404 simples.

#### 4.4. Criar estilos globais mínimos

- Ajustar espaçamento.
- Evitar customização excessiva do PO-UI.
- Criar classes utilitárias pontuais se necessário.

### Critério de aceite

- Aplicação abre com menu lateral.
- Clique em Clientes navega para rota `/clientes`.
- Layout visual está limpo e padronizado.

---

## Fase 5 — Criação da feature clientes

### Objetivo

Criar estrutura da feature `clientes`.

### Tasks

#### 5.1. Criar pastas

Criar:

```text
src/app/features/clientes/
├─ components/
├─ data/
├─ mappers/
├─ models/
├─ pages/
└─ utils/
```

#### 5.2. Criar arquivo de rotas

Arquivo:

```text
src/app/features/clientes/clientes.routes.ts
```

Rotas:

```ts
export const CLIENTES_ROUTES: Routes = [
  { path: '', component: ClienteListPageComponent },
  { path: ':filial/:cod/:loja', component: ClienteDetailPageComponent },
  { path: ':filial/:cod/:loja/editar', component: ClienteEditPageComponent }
];
```

#### 5.3. Integrar rotas no app

No `app.routes.ts` ou módulo de rotas:

```ts
{
  path: 'clientes',
  loadChildren: () => import('./features/clientes/clientes.routes').then(m => m.CLIENTES_ROUTES)
}
```

### Critério de aceite

- Rotas criadas.
- Feature isolada.
- Navegação para `/clientes` funcional, mesmo que tela ainda esteja vazia.

---

## Fase 6 — Modelagem da SA1

### Objetivo

Criar os models TypeScript do cliente Protheus.

### Tasks

#### 6.1. Criar `sa1-cliente.model.ts`

- Criar types auxiliares.
- Criar interface `Sa1Cliente`.
- Criar interface `Sa1ClienteListItem`.

#### 6.2. Criar `cliente-filter.model.ts`

```ts
export interface ClienteFilter {
  search?: string;
  filial?: string;
  uf?: string;
  tipo?: 'F' | 'J' | '';
  bloqueado?: '1' | '2' | '';
}
```

#### 6.3. Criar `cliente-api-contract.model.ts`

```ts
export interface ClienteListResponse<T> {
  items: T[];
  hasNext: boolean;
}
```

#### 6.4. Criar helper de chave composta

Arquivo:

```text
src/app/shared/helpers/protheus-key.helper.ts
```

Funções:

- `buildClienteKey`
- `parseClienteKey`, se necessário
- `isSameClienteKey`

### Critério de aceite

- Models fortemente tipados.
- Nenhum `any`.
- Chave composta centralizada.

---

## Fase 7 — Dados dummy e repositório

### Objetivo

Criar camada de dados dummy simulando API.

### Tasks

#### 7.1. Criar mock

Arquivo:

```text
src/app/features/clientes/data/clientes.mock.ts
```

Subtasks:

- Criar pelo menos 12 clientes.
- Variar UF, tipo, status, limite e saldo.
- Incluir pelo menos 1 registro com `D_E_L_E_T_ = '*'` para testar filtro de ativo.

#### 7.2. Criar contrato abstrato

Arquivo:

```text
src/app/features/clientes/data/cliente.repository.ts
```

Métodos:

- `list(filter)`
- `getByKey(filial, cod, loja)`
- `update(cliente)`

#### 7.3. Criar dummy repository

Arquivo:

```text
src/app/features/clientes/data/cliente-dummy.repository.ts
```

Subtasks:

- Implementar listagem.
- Implementar filtros.
- Implementar busca por chave.
- Implementar update em memória.
- Simular delay.

#### 7.4. Configurar provider

No módulo ou providers da feature:

```ts
{ provide: ClienteRepository, useClass: ClienteDummyRepository }
```

#### 7.5. Criar placeholder HTTP repository

Arquivo:

```text
src/app/features/clientes/data/cliente-http.repository.ts
```

Subtasks:

- Criar classe com métodos ainda não usados.
- Comentar que será ativada quando API REST existir.

### Critério de aceite

- Feature consome `ClienteRepository`, não consome mock diretamente.
- Listagem dummy retorna dados.
- Busca por chave funciona.
- Update em memória funciona.

---

## Fase 8 — Tela de listagem

### Objetivo

Implementar página `/clientes`.

### Tasks

#### 8.1. Criar componente de página

```bash
ng generate component features/clientes/pages/cliente-list-page
```

#### 8.2. Criar template com PO-UI

Usar:

- `po-page-default`
- `po-input`
- `po-select`
- `po-button`
- `po-table`
- `po-tag`

#### 8.3. Criar colunas da tabela

Arquivo sugerido:

```text
src/app/features/clientes/utils/cliente-table-columns.util.ts
```

Subtasks:

- Definir labels.
- Definir tipos.
- Definir campos monetários.
- Definir ações.

#### 8.4. Criar filtros

Subtasks:

- Campo busca geral.
- Select UF.
- Select tipo pessoa.
- Select status bloqueio.
- Botão pesquisar.
- Botão limpar.

#### 8.5. Criar navegação

Subtasks:

- Ação visualizar.
- Ação editar.
- Montar rota com `filial`, `cod`, `loja`.

#### 8.6. Tratar estados

Subtasks:

- Loading.
- Erro.
- Lista vazia.

### Critério de aceite

- Usuário vê clientes na tabela.
- Filtros funcionam.
- Ações navegam corretamente.
- Status bloqueado/ativo aparece visualmente.

---

## Fase 9 — Tela de visualização

### Objetivo

Implementar página `/clientes/:filial/:cod/:loja`.

### Tasks

#### 9.1. Criar componente de página

```bash
ng generate component features/clientes/pages/cliente-detail-page
```

#### 9.2. Ler parâmetros da rota

Subtasks:

- Ler `filial`.
- Ler `cod`.
- Ler `loja`.
- Validar se existem.

#### 9.3. Buscar cliente

Subtasks:

- Chamar `repository.getByKey`.
- Exibir loading.
- Tratar não encontrado.

#### 9.4. Montar blocos visuais

Blocos:

- Identificação.
- Dados cadastrais.
- Endereço.
- Contato.
- Comercial/Financeiro.
- Controle/Status.

#### 9.5. Criar ações

- Voltar.
- Editar.

### Critério de aceite

- Cliente correto é exibido.
- Campos estão organizados.
- Botão editar navega para tela correta.
- Cliente inexistente é tratado de forma amigável.

---

## Fase 10 — Formulário de edição

### Objetivo

Criar formulário reutilizável para edição de cliente.

### Tasks

#### 10.1. Criar componente `cliente-form`

```bash
ng generate component features/clientes/components/cliente-form
```

#### 10.2. Criar Reactive Form tipado

Subtasks:

- Criar form group.
- Aplicar validators obrigatórios.
- Aplicar maxlength conforme SA1.
- Aplicar validator de e-mail.
- Aplicar validator de CPF/CNPJ básico.

#### 10.3. Dividir formulário em seções

Seções:

- Identificação.
- Dados cadastrais.
- Endereço.
- Contato.
- Comercial/Financeiro.
- Controle/Status.

#### 10.4. Usar componentes PO-UI

Usar:

- `po-input`
- `po-select`
- `po-decimal`
- `po-datepicker`
- `po-divider`
- `po-button`

#### 10.5. Criar outputs

O componente deve emitir:

- `save`
- `cancel`
- `dirtyChange`, se necessário

### Critério de aceite

- Formulário renderiza todos os campos previstos.
- Campos obrigatórios validam corretamente.
- Campos de chave ficam somente leitura.
- Componente pode ser usado pela página de edição.

---

## Fase 11 — Tela de edição

### Objetivo

Implementar página `/clientes/:filial/:cod/:loja/editar`.

### Tasks

#### 11.1. Criar componente de página

```bash
ng generate component features/clientes/pages/cliente-edit-page
```

#### 11.2. Buscar cliente pela rota

Subtasks:

- Ler parâmetros.
- Buscar cliente.
- Preencher formulário.

#### 11.3. Salvar alterações

Subtasks:

- Validar formulário.
- Montar objeto `Sa1Cliente` atualizado.
- Chamar `repository.update`.
- Exibir notificação de sucesso.
- Navegar para detalhe.

#### 11.4. Cancelamento seguro

Subtasks:

- Se form não estiver alterado, voltar direto.
- Se form estiver alterado, abrir modal de confirmação.
- Se confirmar, descartar alterações.

#### 11.5. Tratar erros

Subtasks:

- Cliente não encontrado.
- Erro simulado ao salvar.
- Campos inválidos.

### Critério de aceite

- Edição altera dados dummy em memória.
- Salvar redireciona para detalhe.
- Cancelar protege alterações não salvas.
- Validações impedem salvar dados inválidos.

---

## Fase 12 — Componentes auxiliares e acabamento visual

### Objetivo

Melhorar a experiência do usuário e reduzir repetição.

### Tasks

#### 12.1. Criar `cliente-status-tag`

Responsável por exibir:

- Ativo.
- Bloqueado.

#### 12.2. Criar `cliente-summary-card`

Exibir resumo no topo das telas de detalhe e edição:

- Código.
- Loja.
- Razão social.
- CPF/CNPJ.
- Status.

#### 12.3. Criar empty state

Componente compartilhado para quando não houver dados.

#### 12.4. Criar loading wrapper

Componente simples para padronizar carregamento.

#### 12.5. Revisar responsividade

- Listagem em telas menores.
- Formulário com grids responsivos.
- Evitar campos muito apertados.

### Critério de aceite

- Interface mais consistente.
- Menos repetição de HTML.
- Boa usabilidade em notebook e monitor comum.

---

## Fase 13 — Preparação para API REST futura

### Objetivo

Deixar o projeto pronto para integração real posterior.

### Tasks

#### 13.1. Criar environment com URL base

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/rest'
};
```

#### 13.2. Documentar endpoints

Criar:

```text
docs/API-FUTURA.md
```

Incluir:

- Rotas.
- Query params.
- Payloads.
- Respostas.
- Erros esperados.

#### 13.3. Criar HTTP repository base

Implementar estrutura sem ativar provider por padrão.

#### 13.4. Criar mapper

Arquivo:

```text
src/app/features/clientes/mappers/cliente.mapper.ts
```

Responsabilidades:

- Converter resposta API para model frontend.
- Converter form para payload API.

#### 13.5. Criar interceptador de erro

Preparar interceptor genérico para erros HTTP futuros.

### Critério de aceite

- Troca futura de dummy para HTTP exige baixa alteração.
- Contrato da API está documentado.
- Environment preparado.

---

## Fase 14 — Testes

### Objetivo

Garantir comportamento mínimo confiável.

### Tasks

#### 14.1. Testar helpers

- `buildClienteKey`.
- Comparação de chave.
- Formatação de CPF/CNPJ.

#### 14.2. Testar validators

- Obrigatórios.
- Tamanho máximo.
- E-mail inválido.
- CPF/CNPJ básico.

#### 14.3. Testar dummy repository

- Lista somente ativos.
- Filtra por busca.
- Filtra por UF.
- Busca por chave.
- Atualiza cliente.
- Retorna null quando não encontra.

#### 14.4. Testar páginas principais

- Listagem renderiza dados.
- Detalhe carrega cliente.
- Edição bloqueia salvar inválido.

### Critério de aceite

- Testes principais passando.
- Build continua funcionando.
- Lint sem erros críticos.

---

## Fase 15 — Revisão final e documentação

### Objetivo

Concluir a primeira versão frontend-only com documentação e checklist.

### Tasks

#### 15.1. Atualizar README

Incluir:

- Objetivo do projeto.
- Stack.
- Como instalar.
- Como rodar.
- Como testar.
- Como alterar entre dummy e HTTP futuramente.

#### 15.2. Criar documentação de convenções

Arquivo:

```text
docs/CONVENCOES.md
```

Incluir:

- Estrutura de pastas.
- Padrões de nome.
- Padrão de repository.
- Padrão de componentes.

#### 15.3. Criar documentação de prompts

Arquivo:

```text
docs/PROMPTS-CODEX.md
```

Incluir:

- Prompt base.
- Prompt de revisão.
- Prompt de refatoração.
- Prompt de teste.

#### 15.4. Executar checklist final

Comandos:

```bash
npm run format:check
npm run lint
npm run build
npm test
```

#### 15.5. Criar tag inicial

Sugestão:

```bash
git tag v0.1.0-frontend-dummy
```

### Critério de aceite

- Projeto documentado.
- Build aprovado.
- Lint aprovado.
- Testes principais aprovados.
- Primeira versão pronta para evolução.

---

# 19. Checklist final de entrega da versão frontend dummy

- [x] Repositório criado.
- [x] Angular `~21.2.4` instalado.
- [x] Node `v22.17.1` validado.
- [x] PO-UI Components instalado.
- [x] PO-UI Templates instalado.
- [x] Layout base com menu e toolbar.
- [ ] Rota `/clientes` criada.
- [ ] Rota `/clientes/:filial/:cod/:loja` criada.
- [ ] Rota `/clientes/:filial/:cod/:loja/editar` criada.
- [ ] Model `Sa1Cliente` criado.
- [ ] Mock com pelo menos 12 clientes criado.
- [ ] Repository dummy criado.
- [ ] Repository HTTP placeholder criado.
- [ ] Tela de listagem criada.
- [ ] Filtros funcionando.
- [ ] Tela de detalhe criada.
- [ ] Tela de edição criada.
- [ ] Validações implementadas.
- [ ] Notificações implementadas.
- [ ] Loading implementado.
- [ ] Empty state implementado.
- [ ] README atualizado.
- [ ] `docs/API-FUTURA.md` criado.
- [ ] `docs/CONVENCOES.md` criado.
- [ ] `docs/PROMPTS-CODEX.md` criado.
- [x] `npm run build` aprovado.
- [ ] `npm run lint` aprovado.
- [ ] Testes principais aprovados.

---

# 20. Orientação final para o Codex

O Codex deve tratar este arquivo como a especificação central do projeto.

Regras obrigatórias:

1. Não criar backend.
2. Não conectar API real nesta fase.
3. Não remover a camada de repository.
4. Não consumir mock diretamente nos componentes.
5. Não usar `any` sem justificativa forte.
6. Não criar telas fora da estrutura proposta.
7. Usar PO-UI como base visual principal.
8. Manter nomes dos campos Protheus nos models.
9. Usar labels amigáveis na interface.
10. Validar build e lint ao final de cada fase.

---

# 21. Referências oficiais consultadas

- Angular — Version compatibility: https://angular.dev/reference/versions
- Angular — Update guide: https://angular.dev/update-guide
- PO-UI — Getting started: https://po-ui.io/guides/getting-started
- PO-UI — Documentation: https://po-ui.io/documentation
- PO-UI — Page Dynamic Table: https://po-ui.io/documentation/po-page-dynamic-table
- PO-UI — Page Dynamic Detail: https://po-ui.io/documentation/po-page-dynamic-detail
- PO-UI — Page Dynamic Edit: https://po-ui.io/documentation/po-page-dynamic-edit
- PO-UI — Table: https://po-ui.io/documentation/po-table
- PO-UI — Dynamic Form: https://po-ui.io/documentation/po-dynamic-form
