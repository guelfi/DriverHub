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

## 5. Solicitações para a Geração/Continuação do Projeto (Estado Atual)

Com base nas funcionalidades e arquitetura definidas, e considerando o progresso atual, solicito à IA:

1.  **Estrutura de Projetos .NET 8:** A solução `DriverHub.sln` já está configurada com os projetos `src/DriverHub.API`, `src/DriverHub.Application`, `src/DriverHub.Domain` e `src/DriverHub.Infrastructure`, seguindo a Clean Architecture.
2.  **Módulo de Autenticação JWT e Autorização por Roles:** O sistema já possui um módulo de autenticação JWT funcional, com suporte a roles (`Motorista`, `Admin`). A injeção de dependência para `IAuthService`, `IPasswordHasher` e `ITokenService` está configurada.
3.  **Modelos de Entidades Base:** As entidades `Motorista` e `Viagem` já estão definidas no projeto `DriverHub.Domain`. O modelo `Motorista` inclui campos para autenticação e parâmetros fixos (Aluguel Semanal, Dias Trabalhados por Semana, Autonomia do Veículo).
4.  **Repositório de Motorista:** A interface `IMotoristaRepository` e sua implementação `MotoristaRepository` (utilizando Entity Framework Core com banco de dados em memória para desenvolvimento) estão configuradas para operações CRUD básicas em `Motorista`.
5.  **Tratamento de Exceções Global:** Um middleware de tratamento de exceções (`ExceptionHandlingMiddleware`) está implementado no `DriverHub.API` para capturar e logar exceções não tratadas, retornando respostas padronizadas.
6.  **Configuração de Logging:** O Serilog está configurado no `Program.cs` para logging centralizado, com injeção de `ILogger` nas classes de serviço e repositório.
7.  **Testes Unitários Iniciais:** Testes unitários para a `AuthService` (`AuthServiceTests.cs`) foram implementados, demonstrando o uso de mocks e a testabilidade da arquitetura.
8.  **Containerização:** `Dockerfile` para o backend e `podman-compose.yml` (compatível com Docker Compose) estão presentes para facilitar o desenvolvimento e a implantação.

**Próximos Passos (a serem desenvolvidos):**

9.  **Implementar Entidades e Repositórios para `LancamentoDiario` e `DespesaPessoal`:** Definir os modelos de entidades e seus respectivos repositórios (CRUD completo).
10. **Desenvolver a Lógica de Negócio para Cálculos Financeiros:** Implementar os cálculos automáticos de desempenho e custos para motoristas, conforme detalhado na seção "3.1.d) Cálculos Automáticos e Análises de Desempenho".
11. **Definir e Implementar Queries/Lógica para Relatórios Agregados:** Criar a base para os relatórios do dashboard do administrador, garantindo a privacidade dos dados.
12. **Esboço e Integração do Frontend React Native:** Desenvolver a estrutura inicial do frontend móvel, incluindo telas essenciais, navegação e integração via API RESTful com o backend .NET.
13. **Desenvolvimento do Frontend Administrativo:** Iniciar a implementação do dashboard web para administradores (Razor Pages ou Blazor Server).
14. **Integração com Banco de Dados PostgreSQL:** Migrar o banco de dados de memória para PostgreSQL.
15. **Exploração e Integração de Ferramentas AI:** Iniciar a exploração e integração com Google Gemini CLI, AI Studio e Firebase Studio para funcionalidades avançadas.

Siga boas práticas de Clean Code, Design Patterns (como Repository Pattern) e segurança (criptografia de dados, proteção contra ataques comuns, conformidade com privacidade). O objetivo é continuar a evolução do protótipo funcional.