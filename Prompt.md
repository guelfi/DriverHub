# 🟩 PROMPT PARA DESENVOLVIMENTO DE MICRO SAAS: DRIVERHUB

Você atuará como um desenvolvedor sênior especialista em .NET 8, PostgreSQL e arquitetura de Micro SaaS com Docker/Podman. O projeto, chamado "DriverHub", será um laboratório de estudo e aprendizado prático, focado em ajudar motoristas de aplicativo a gerenciar finanças e desempenho operacional com automação e insights.

## 1. Visão Geral do Aplicativo e Público-Alvo

**Propósito:** Aplicativo móvel (DriverHub) para motoristas de plataforma gerenciarem finanças e desempenho operacional com automação e insights.

**Público-Alvo:** Motoristas profissionais (Uber/99) com familiaridade média com apps.

**Casos de Uso Principais:**
1.  **Fluxo de Registro Diário:** Motorista abre app → seleciona plataforma → insere ganhos brutos e km rodados → sistema calcula automaticamente despesas (combustível, depreciação, etc.).
2.  **Análise Semanal:** Motorista acessa dashboard → filtra por período → compara desempenho com semanas anteriores.

## 2. Módulos do Sistema e Perfis de Usuário

O sistema terá dois perfis de usuário principais:
- **Motorista:** Interface mobile-first (React Native) para registro e acompanhamento pessoal.
- **Administrador:** Dashboard web (Blazor Server ou Razor Pages) para visão agregada e gestão.

## 3. Funcionalidades Detalhadas

### 3.1. Módulo para Motoristas (Aplicativo Móvel - React Native)

**a) Autenticação:**
- Login tradicional (usuário, senha e e-mail).
- Login social (integração com Google OAuth + número de celular).
- Autenticação via JWT.

**b) Registro de Lançamento Diário:**
Os motoristas registrarão diariamente as seguintes informações consolidadas:
- **Registro Automatizado de Corridas:** Integração com APIs de Uber/99 (via webhook) para captura automatizada ou entrada manual simplificada via formulário.
- **Data** do lançamento.
- **Km rodados no dia** (quilometragem total percorrida no dia).
- **Faturamento Bruto Total do Dia (R$)** (soma de todas as plataformas).
- **Faturamento Bruto por Plataforma** (ex: Uber, 99, InDrive).
- **Número de Corridas por Plataforma.**
- **Valor médio do etanol por litro (R$)** (preço do combustível no dia do abastecimento).
- **Horas trabalhadas no dia** (ex: 8.5 horas).
- **Outras Despesas Variáveis do Dia:** Quaisquer custos adicionais diários não fixos (ex: manutenção inesperada, lavagem do carro).

**c) Parâmetros Fixos e Personalizáveis por Motorista:**
O sistema deve permitir que o motorista configure seus próprios parâmetros fixos, utilizados nos cálculos:
- **Aluguel semanal do veículo:** (ex: R$800,00)
- **Dias trabalhados por semana:** (ex: 6)
- **Autonomia do veículo:** (ex: 7,00 km/l)

**d) Cálculos Automáticos e Análises de Desempenho:**
O sistema deve realizar e apresentar os seguintes cálculos automáticos, com todos os valores formatados com duas casas decimais, baseando-se na lógica da planilha `Uberlândia[Junho].xlsx` e no prompt de ganhos diários:
- **Custo com Combustível:** `(Km rodados no dia / Autonomia do veículo) * Valor médio do etanol por litro`.
- **Consumo Total de Combustível:** `Km rodados no dia / Autonomia do veículo` (em litros).
- **Custo Fixo da Diária (Aluguel):** `Aluguel semanal do veículo / Dias trabalhados por semana`.
- **Custo Total do Dia:** `Custo fixo da diária + Custo com combustível + Outras Despesas Variáveis do Dia`.
- **Lucro Líquido Real do Dia:** `Faturamento Bruto Total do Dia - Custo Total do Dia`.
- **Ganho por Hora:** `Faturamento Bruto Total do Dia / Horas trabalhadas no dia`.
- **Lucro Líquido por Hora:** `Lucro Líquido Real do Dia / Horas trabalhadas no dia`.
- **Ganho por Km:** `Faturamento Bruto Total do Dia / Km rodados no dia`.
- **Custo por Km (Total):** `Custo Total do Dia / Km rodados no dia`.
- **Lucro por Corrida:** `Lucro Líquido Real do Dia / Número Total de Corridas Diárias`.
- **Métricas Derivadas da Planilha (para validação e replicação):**
    - `KM / LITRO` (será a autonomia configurada, mas pode ser validado pelo sistema).
    - `KM / COMBUSTÍVEL`
    - `KM / LOCAÇÃO`
    - `CUSTO CORRIDA`
    - `Média Diária Bruto`
    - `Média Dia Líquido`
    - `Média KM Dia`
    - `Valor Médio Etanol` (do dia)
    - `Média $ / KM`
    - `Locação (por KM)`
    - `Combustível/KM`
    - `Despesas (por KM)`
    - `Resultado (por KM)`
    - `Valor Médio Corrida`
- Exibição dos resultados em **Tabela Completa** e um **Resumo Final Textual** para o motorista.

**e) Dashboard Financeiro (Visualização):**
- Visualização clara de lucro líquido, despesas fixas/variáveis e KPIs (lucro por hora, custo por km, etc.).
- Gráficos interativos (ex: Line chart do Lucro por Hora com tooltip ao toque).

**f) Alertas Inteligentes:**
- Notificações para gastos atípicos, horários de alta demanda, ou outras anomalias/oportunidades identificadas pela IA.

**g) Controle de Despesas Pessoais:**
- Registro e categorização de despesas pessoais (e.g., alimentação, manutenção do veículo).
- Relatórios visuais de despesas.

**h) Relatórios e Análises Pessoais:**
- Gráficos e tabelas de desempenho individual (diário, semanal, mensal) com projeções.
- Sugestões e insights para otimização de resultados.
- **Relatórios Exportáveis:** PDF/CSV com histórico mensal.

### 3.2. Módulo para Administradores (Dashboard Web)

**a) Login Administrativo:**
- Autenticação com papel "Admin".

**b) Dashboard Consolidado (Dados Agregados e Anônimos):**
- Total de motoristas cadastrados.
- Total de corridas executadas por plataforma.
- Faturamento bruto total por plataforma (agregado).
- Quilometragem total rodada por todos os motoristas.
- Evolução de ganhos e métricas médias (R$/km, R$/hora) de forma agregada.
- **Informações Estatísticas de Desempenho Agregadas:**
    - Média de Quilômetros por Corrida (geral, diária, mensal, agregada).
    - Valor Médio Pago por Quilômetro (geral, agregado).
    - Outras médias consolidadas (faturamento bruto diário, líquido diário, custo por corrida, etc.).
- **Garantia de privacidade dos dados individuais dos motoristas.**

**c) Gestão de Motoristas:**
- Visualização e gerenciamento de perfis de motoristas.
- **Acesso a dados de desempenho individuais dos motoristas:** Com as devidas permissões e políticas de privacidade bem definidas, para suporte e identificação de tendências (esta funcionalidade deve ser implementada com extrema cautela e clara justificativa, focando na privacidade).

## 4. Arquitetura e Tecnologias

- **Backend:** `.NET 8 LTS (Web API)` em `C#`.
- **Banco de Dados:** `PostgreSQL` com `Entity Framework Core`.
- **Arquitetura:** `DDD (Domain-Driven Design)` e `Clean Architecture`, aplicando `Repository Pattern`.
- **Front-end Motorista:** **React Native (Mobile First)**.
    - **Estrutura de Navegação:** Bottom Navigation Bar (Home, Registrar, Histórico, Perfil).
    - **Telas Essenciais:** Login, Modal de Registro Rápido, Tela de Detalhes da Corrida.
    - **Estados da UI:** Loading (Skeleton screens), Erro (Toast messages).
    - **Componentes Customizados:** Cartão de Métrica, Gráfico Interativo.
    - **Microinterações:** Feedback tátil.
    - **Gerenciamento de Estado:** Redux Toolkit.
    - **Validações de Formulário:** Visuais e lógicas.
    - **Integração com API Backend:** Axios para chamadas RESTful (ex: `[HttpGet("driver/{id}/metrics")]`).
    - **Bibliotecas Recomendadas (Frontend):** `shadcn/ui`, `Chart.js + react-chartjs-2`.
    - **Estrutura de Código React Recomendada:** `src/components/`, `src/hooks/`, `src/pages/`, `src/services/`.
- **Front-end Administrador:** `Web First` (considerar `Razor Pages` inicialmente, com possível migração para `Blazor Server`).
- **Containerização:** `Docker` (utilizando `Dockerfile` e `podman-compose.yml` para desenvolvimento e produção, compatível com `Podman`).
- **Controle de Versão:** `Git` com `GitHub`.
- **CI/CD:** `GitHub Actions`.
- **Hospedagem:** `VPS Linux` (Hostinger).
- **Ferramentas AI:** `Gemini CLI (Google)`, `Google AI Studio`, `Google Firebase Studio` (para integração AI e exploração de analytics/automações).
- **Auxiliares:** `Node.js (CLI tooling)`, `OpenAI CLI`, `Azure Data Studio` (opcional para DB).

## 5. Solicitações para a Geração Inicial do Projeto

Com base nas funcionalidades e arquitetura definidas, solicito à IA:

1.  **Estrutura inicial do projeto .NET 8** (`DriverHub.sln` e pastas `src/Api`, `src/Application`, `src/Domain`, `src/Infrastructure`).
2.  Módulo de **autenticação JWT com suporte a roles** (Motorista, Admin) e base para login social (Google).
3.  **Modelos de entidades para as tabelas principais:**
    - `Motorista` (com campos para autenticação e **parâmetros fixos** como Aluguel Semanal, Dias Trabalhados por Semana, Autonomia do Veículo).
    - `LancamentoDiario` (incluindo campos para Data, Km Rodados, Faturamento Bruto Total, Valor Médio Etanol do Dia, Horas Trabalhadas).
    - `PlataformaCorrida` (associada ao `LancamentoDiario`, com campos para Plataforma, Quantidade de Corridas, Faturamento Bruto por Plataforma).
    - `DespesaPessoal` (para o motorista, com Categorização, Data, Valor e Descrição).
4.  **CRUD completo para `LancamentosDiarios` e `DespesasPessoais`**.
5.  **Definição das queries ou lógica inicial para os Relatórios Agregados** do dashboard do administrador (sem expor dados sensíveis).
6.  **Dockerfile para o backend e `podman-compose.yml`** para desenvolvimento e produção (configurando PostgreSQL e o serviço da API).
7.  Implementação inicial das **interfaces e classes de domínio/aplicação** para refletir a arquitetura DDD/Clean Architecture, incorporando a lógica dos cálculos de desempenho.
8.  **Esboço de estrutura para o frontend React Native** com os principais arquivos de página/componentes e configuração básica de navegação, **integrável via API RESTful com o backend .NET**. Incluir exemplos de dados mockados para demonstração inicial do frontend.

Siga boas práticas de Clean Code, Design Patterns (como Repository Pattern) e segurança (criptografia de dados, proteção contra ataques comuns, conformidade com privacidade). O resultado deve ser um protótipo funcional em React Native que possa ser integrado ao backend ASP.NET Core via API RESTful.