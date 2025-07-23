# 🚀 Contexto do Projeto DriverHub (Simplificado para Gemini CLI)

Este documento resume a estrutura e os componentes do projeto DriverHub, focando nas informações mais relevantes para o desenvolvimento contínuo.

## 1. 🏗️ Visão Geral da Solução

A solução `DriverHub.sln` é organizada seguindo os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**, com os seguintes projetos principais:

*   **`DriverHub.API`**: Camada de apresentação (Web API), responsável por expor os endpoints RESTful, lidar com requisições HTTP, autenticação e tratamento global de exceções.
*   **`DriverHub.Application`**: Camada de aplicação, contendo a lógica de negócio, serviços de aplicação, DTOs e interfaces de serviço. Orquestra as operações e interage com o domínio e a infraestrutura.
*   **`DriverHub.Domain`**: Camada de domínio, o *coração da aplicação*. Contém as entidades de negócio, interfaces de repositório e regras de negócio.
*   **`DriverHub.Infrastructure`**: Camada de infraestrutura, responsável pela implementação de detalhes técnicos, como acesso a dados (Entity Framework Core), repositórios e serviços externos.
*   **`DriverHub.Tests`**: Projeto de testes unitários para garantir a qualidade e a testabilidade do código.

## 2. 🧩 Componentes Chave e Implementações Atuais

### 2.1. `DriverHub.Domain`

*   **Entidades**: `Motorista` (com `Id`, `Nome`, `Sobrenome`, `Email`, `SenhaHash`, `Sal`, `NumeroCelular`, `AluguelSemanalVeiculo`, `DiasTrabalhadosPorSemana`, `AutonomiaVeiculoKmPorLitro`, `DataCadastro`, `Role` - `Motorista` e `Admin`) e `Viagem`.
*   **Repositórios**: `IMotoristaRepository` (CRUD para `Motorista`, incluindo `GetByRoleAsync`).

### 2.2. `DriverHub.Application`

*   **DTOs**: `LoginDto`, `RegisterDto`.
*   **Serviços**: `IAuthService` (com `RegisterAsync`, `LoginAsync`, `RegisterAdminAsync`), `IPasswordHasher`, `ITokenService`.

### 2.3. `DriverHub.Infrastructure`

*   **Acesso a Dados**: `ApplicationDbContext` configurado para **PostgreSQL** com `snake_case`.
*   **Repositórios**: `MotoristaRepository` (implementa `IMotoristaRepository`, incluindo `GetByRoleAsync`).

### 2.4. `DriverHub.API`

*   **Controladores** 🌐:
    *   `Controllers/AuthController.cs`: Controlador API que expõe endpoints `/register` e `/login`. Utiliza `IAuthService` para processar as requisições. Agora passa `sobrenome` para `RegisterAsync` e retorna `Nome` e `Sobrenome` na resposta de login. Os endpoints `ProtectedData` e `register-admin` foram removidos. (A criação do primeiro usuário administrador é feita via script CLI, e o gerenciamento de usuários administrativos futuros será implementado em um endpoint protegido por autenticação de administrador).

*   **Middleware**: `ExceptionHandlingMiddleware` para tratamento global de exceções.
*   **Configuração**: Serilog para logging, PostgreSQL, injeção de dependências, autenticação JWT Bearer, Swagger/OpenAPI, CORS. A API escuta em `http://0.0.0.0:5217`. Na inicialização, verifica a existência de um usuário `Admin` e loga um aviso se nenhum for encontrado. Endpoints `ProtectedData` e `WeatherForecast` foram removidos.

### 2.5. `DriverHub.MobileApp` (Frontend Mobile) 📱

*   **Estrutura:** Projeto **React Native**.
*   **Autenticação:** Telas de login e registro, serviço `AuthService` para comunicação com a API.
*   **Navegação:** Configurada entre telas de autenticação e `HomeScreen`.
*   **Tema:** Implementação de modo claro/escuro.

### 2.6. `DriverHub.Dashboard` (Frontend Administrativo) 💻

*   **Estrutura:** Novo projeto **React** em `src/DriverHub.Dashboard/` para o dashboard administrativo.
*   **Tecnologias:** React (JavaScript) e Bootstrap para UI.
*   **Funcionalidades Planejadas:** Menu lateral responsivo (expandido/recolhido), autenticação de usuários administrativos, e exibição inicial do número de motoristas cadastrados.

## 3. ✅ Alinhamento e Próximos Passos

A estrutura atual do projeto e as funcionalidades implementadas estão alinhadas com os objetivos.

**Etapas Concluídas Recentemente:**
*   Integração com Banco de Dados PostgreSQL.
*   Implementação da verificação de primeiro administrador na API.
*   Criação do projeto `DriverHub.Dashboard`.
*   Implementação de Entidades e Repositórios para `LancamentoDiario` e `DespesaPessoal`.
*   Criação do projeto `DriverHub.AdminTool` para criação e gerenciamento de usuários administrativos via CLI.

**Próximos Passos Focados:**
*   Re-estilização da interface do DriverHub.MobileApp.
*   Desenvolver a Lógica de Negócio para Cálculos Financeiros.
*   Definir e Implementar Queries/Lógica para Relatórios Agregados.
*   Esboçar e Integrar o Frontend React Native (continuar o desenvolvimento).
*   Explorar e Integrar Ferramentas Google AI.

## 4. 🛠️ Ferramentas de Desenvolvimento

*   **`servershub.sh`**: Script unificado para gerenciar os serviços de desenvolvimento (API e Aplicativo Móvel). Suporta `start`, `stop` e `status`.
*   **`create_admin.sh`**: Script CLI para registrar o primeiro usuário administrador. Este script agora executa o `DriverHub.AdminTool` para uma criação segura e isolada, sem a necessidade de parar e reiniciar a API.

Este documento será atualizado conforme o projeto evolui. 🔄
---
## Gemini Added Memories
- Todas as mensagens devem ser em português brasileiro.
- O usuário prefere realizar o git push manualmente e deve ser lembrado de fazê-lo em pontos de verificação importantes do projeto.
- O usuário está trabalhando no projeto DriverHub.
- O projeto DriverHub foi iniciado em 2025-07-06.
- A última grande tarefa foi o merge da branch `feature/admin-dashboard-setup` para a `main`. A branch de feature foi arquivada como `feature/admin-dashboard-setup-archive` e enviada ao repositório remoto para preservar o histórico.
- O usuário fará o push da branch `main` manualmente quando necessário.

