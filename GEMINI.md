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

*   **Controladores**: `AuthController.cs` (endpoints `/register`, `/login`, `/register-admin`).
*   **Middleware**: `ExceptionHandlingMiddleware` para tratamento global de exceções.
*   **Configuração**: Serilog para logging, PostgreSQL, injeção de dependências, autenticação JWT Bearer, Swagger/OpenAPI, CORS. A API escuta em `http://0.0.0.0:5217`. Na inicialização, verifica a existência de um usuário `Admin` e loga um aviso se nenhum for encontrado. Endpoints `ProtectedData` e `WeatherForecast` foram removidos.

### 2.5. `DriverHub.Tests`

*   Projeto de testes unitários utilizando `xUnit` e `Moq`. Inclui testes para `AuthService` (registro, login, `RegisterAdminAsync` - sucesso, admin já existe, email em uso).

### 2.6. `DriverHub.MobileApp` (Frontend Mobile) 📱

*   **Estrutura:** Projeto **React Native**.
*   **Autenticação:** Telas de login e registro, serviço `AuthService` para comunicação com a API.
*   **Navegação:** Configurada entre telas de autenticação e `HomeScreen`.
*   **Tema:** Implementação de modo claro/escuro.

### 2.7. `DriverHub.Dashboard` (Frontend Administrativo) 💻

*   **Estrutura:** Novo projeto **React** em `src/DriverHub.Dashboard/` para o dashboard administrativo.
*   **Tecnologias:** React (JavaScript) e Bootstrap para UI.
*   **Funcionalidades Planejadas:** Menu lateral responsivo (expandido/recolhido), autenticação de usuários administrativos, e exibição inicial do número de motoristas cadastrados.

## 3. ✅ Alinhamento e Próximos Passos

A estrutura atual do projeto e as funcionalidades implementadas estão alinhadas com os objetivos.

**Etapas Concluídas Recentemente:**
*   Integração com Banco de Dados PostgreSQL.
*   Implementação da verificação de primeiro administrador na API e criação do endpoint `/register-admin`.
*   Criação do projeto `DriverHub.Dashboard`.

**Próximos Passos Focados:**
*   Desenvolver o Frontend Administrativo (dashboard, autenticação, exibição de dados).
*   Implementar Entidades e Repositórios para `LancamentoDiario` e `DespesaPessoal`.
*   Desenvolver a Lógica de Negócio para Cálculos Financeiros.
*   Definir e Implementar Queries/Lógica para Relatórios Agregados.
*   Esboçar e Integrar o Frontend React Native (continuar o desenvolvimento).
*   Explorar e Integrar Ferramentas Google AI.

## 4. 🛠️ Ferramentas de Desenvolvimento

*   **`servershub.sh`**: Script unificado para gerenciar os serviços de desenvolvimento (API e Aplicativo Móvel). Suporta `start`, `stop` e `status`.
*   **`create_admin.sh`**: Script CLI para registrar o primeiro usuário administrador na API.

Este documento será atualizado conforme o projeto evolui. 🔄