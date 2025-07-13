<h1 align="center">🚗 DriverHub</h1>

<p align="center">
  <strong>Micro SaaS DriverHub</strong> para motoristas de aplicativos como Uber, 99 e similares.  
  Este projeto também serve como um <strong>laboratório de estudo e aprendizado prático</strong> com tecnologias modernas no ecossistema .NET e ferramentas Google AI.
</p>

---

### 🧭 Objetivo do Projeto

Desenvolver uma aplicação SaaS que permita aos motoristas de aplicativo:
- Gerenciar corridas por plataforma (sem registrar cada corrida individual).
- Acompanhar dados diários como quilometragem, lucro e desempenho.
- Visualizar relatórios otimizados para dispositivos móveis.

Ao mesmo tempo, permitirá:
- Estudo prático de Clean Architecture, DDD e boas práticas de versionamento.
- Deploy com Docker em ambiente VPS para simulação de produção real.
- Explorar ferramentas avançadas de AI e desenvolvimento com Google Gemini CLI, AI Studio e Firebase Studio.

---

### 🧰 Tecnologias Utilizadas

| Categoria                | Tecnologias e Ferramentas                                  |
|-------------------------|------------------------------------------------------------|
| **Back-End** | `ASP.NET Core 8 LTS`, `C#`                                 |
| **Banco de Dados** | `PostgreSQL`, `Entity Framework Core` |
| **Autenticação** | `JWT (JSON Web Token)`                                     |
| **Arquitetura** | `DDD`, `Clean Architecture`, `Repository Pattern`          |
| **Frontend Web** | `Razor Pages` (foco inicial), possível migração para `Blazor Server` |
| **Frontend Mobile** | `React Native` (Mobile First)                              |
| **DevOps** | `Docker`, `Docker Compose`, `Git`, `GitHub`, `Multipass` (simulação) |
| **Google AI & Cloud** | `Gemini CLI (Google)`, `Google AI Studio`, `Google Firebase Studio` |
| **Editor** | `VS Code` (configurado no macOS Catalina)                  |
| **Auxiliares** | `OpenAI CLI`, `Azure Data Studio`, `Node.js (CLI tooling)` |
| **Logging** | `Serilog`                                                  |

---

### 📦 Estrutura do Projeto

<pre><code>
~/Projetos/DriverHub
├── DriverHub.sln
├── src/
│   ├── DriverHub.API/             # Camada de apresentação (controladores, middleware)
│   ├── DriverHub.Application/     # Lógica de negócio, serviços de aplicação, DTOs
│   ├── DriverHub.Domain/          # Entidades de domínio, interfaces de repositório
│   ├── DriverHub.Infrastructure/  # Implementações de repositório, contexto de DB
│   └── DriverHub.Tests/           # Projeto de testes unitários
├── docker/
│   └── docker-compose.yml         # Configuração Docker Compose para serviços
└── README.md
</code></pre>

---

### 🚀 Funcionalidades Implementadas (Estado Atual)

- [x] Criação da estrutura de pastas (`DriverHub.sln`, `src/API`, `Application`, `Domain`, `Infrastructure`).
- [x] Configuração do ambiente com VS Code e Docker.
- [x] Integração com GitHub.
- [x] Criação da solução .NET com Clean Architecture.
- [x] Módulo de Autenticação JWT com suporte a roles (Motorista, Admin), incluindo registro e login com `Nome` e `Sobrenome`.
- [x] Implementação de `AuthService`, `TokenService` e `PasswordHasher` com injeção de dependência.
- [x] Definição das entidades `Motorista` (agora com `Sobrenome`) e `Viagem` no domínio.
- [x] Implementação de `IMotoristaRepository` e `MotoristaRepository` (com DB em memória).
- [x] Tratamento de exceções global via `ExceptionHandlingMiddleware`.
- [x] Configuração e uso de Serilog para logging centralizado.
- [x] Testes unitários iniciais para `AuthService` (`AuthServiceTests.cs`), atualizados para incluir o parâmetro `sobrenome`.
- [x] Frontend Mobile (`DriverHub.MobileApp`): Implementação das telas de Login e Registro com validação de formulário, funcionalidade de mostrar/ocultar senha, alternância de tema (claro/escuro) e exibição de mensagens de erro/sucesso amigáveis. Fluxo de login redireciona para uma `HomeScreen` que exibe o nome e sobrenome do usuário.

### 🚧 Próximos Passos

- [ ] **Prioridade: Migrar o banco de dados de memória para PostgreSQL** (incluindo as entidades `Motorista` e `Viagem`).
- [ ] Implementar Entidades e Repositórios para `LancamentoDiario` e `DespesaPessoal`.
- [ ] Desenvolver a lógica de negócio para cálculos financeiros e análises de desempenho.
- [ ] Definir e implementar queries/lógica para relatórios agregados do administrador.
- [ ] Continuar o esboço e integração do frontend React Native (desenvolver as demais telas e funcionalidades).
- [ ] Desenvolver o frontend administrativo (Razor Pages ou Blazor Server).
- [ ] Explorar e integrar ferramentas Google AI (Gemini CLI).

---

### 👨‍💻 Status do Projeto

> ✅ **Em desenvolvimento ativo (foco em aprendizado prático e evolução contínua)** > 🔄 Atualizado continuamente com base na evolução do ambiente local, decisões técnicas e integração com ferramentas Google AI.

---

### 💡 Ideias Futuras

- Exportação de relatórios em PDF.
- Integração com API da Uber/99.
- Modo offline (Progressive Web App).
- Notificações para administradores.
- Uso avançado do Google AI Studio e Firebase Studio para automações e analytics.

---

### 📚 Finalidade Educacional

Este projeto é parte de um processo de **aprendizado prático e aprofundado em desenvolvimento moderno**, usando tecnologias **viáveis mesmo em equipamentos mais antigos**, como o macOS Catalina, e ferramentas modernas de AI do Google.

---

### 📬 Contribuições e Contato

Este projeto é pessoal, mas aberto a sugestões, ideias e discussões para fins didáticas.

---

### 🧠 Powered by Estudo + Café ☕ + Google AI 🚀