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

### 2.5. `driverhub.frontendweb` (Frontend PWA e Dashboard) 📱💻

*   **Estrutura:** Projeto **React** configurado como um **Progressive Web App (PWA)** para substituir o antigo `DriverHub.MobileApp` e também servir como o `DriverHub.Dashboard` administrativo.
*   **Tecnologias:** React (JavaScript), Material-UI para componentes de UI, e Bootstrap para layout responsivo.
*   **Funcionalidades Planejadas:**
    *   **Para Motoristas (Mobile):** Telas de login, registro, dashboard com métricas financeiras, lançamento de despesas e visualização de histórico.
    *   **Para Administradores (Dashboard):** Menu lateral responsivo, autenticação de administrador, visualização de motoristas cadastrados e relatórios agregados.

## 3. ✅ Alinhamento e Próximos Passos

A estrutura atual do projeto e as funcionalidades implementadas estão alinhadas com os objetivos.

**Etapas Concluídas Recentemente:**
*   Integração com Banco de Dados PostgreSQL.
*   Implementação da verificação de primeiro administrador na API.
*   Criação do projeto `DriverHub.AdminTool` para gerenciamento de administradores via CLI.
*   **Migração do Frontend:** Iniciada a substituição do `DriverHub.MobileApp` (React Native) e `DriverHub.Dashboard` por um único projeto PWA (`driverhub.frontendweb`) com React e Material-UI.

**Próximos Passos Focados:**
*   **Desenvolver o PWA (`driverhub.frontendweb`):**
    *   Implementar a estrutura de navegação (rotas) para as áreas do motorista e do administrador.
    *   Construir os componentes de UI reutilizáveis com Material-UI.
    *   Desenvolver os serviços de autenticação e comunicação com a API.
    *   Implementar as telas de Login, Registro e o Dashboard inicial do Motorista.
*   **Desenvolver a Lógica de Negócio na API:**
    *   Implementar os cálculos financeiros para o dashboard do motorista.
    *   Definir e implementar as queries para os relatórios agregados do administrador.
*   **Explorar e Integrar Ferramentas Google AI.**

## 4. 🛠️ Ferramentas de Desenvolvimento

*   **`servershub.sh`**: Script unificado para gerenciar os serviços de desenvolvimento (API e Frontend Web). Suporta `start`, `stop` e `status`.
*   **`create_admin.sh`**: Script CLI para registrar o primeiro usuário administrador. Este script agora executa o `DriverHub.AdminTool` para uma criação segura e isolada.

Este documento será atualizado conforme o projeto evolui. 🔄
---
## Gemini Added Memories
- Todas as mensagens devem ser em português brasileiro.
- O usuário prefere realizar o git push manualmente e deve ser lembrado de fazê-lo em pontos de verificação importantes do projeto.
- O usuário está trabalhando no projeto DriverHub.
- O projeto DriverHub foi iniciado em 2025-07-06.
- A última grande tarefa foi o merge da branch `feature/admin-dashboard-setup` para a `main`. A branch de feature foi arquivada como `feature/admin-dashboard-setup-archive` e enviada ao repositório remoto para preservar o histórico.
- O usuário fará o push da branch `main` manualmente quando necessário.
