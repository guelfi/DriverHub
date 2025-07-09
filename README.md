<h1 align="center">🚗 DriverHub</h1>

<p align="center">
  <strong>Micro SaaS</strong> para motoristas de aplicativos como Uber, 99 e similares.  
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
| **Banco de Dados** | `PostgreSQL`, `Entity Framework Core`                      |
| **Autenticação** | `JWT (JSON Web Token)`                                     |
| **Arquitetura** | `DDD`, `Clean Architecture`, `Repository Pattern`          |
| **Frontend Web** | `Razor Pages` (foco inicial), possível migração para `Blazor Server` |
| **Frontend Mobile** | `React Native` (Mobile First)                              |
| **DevOps** | `Docker`, `Docker Compose`, `Git`, `GitHub`, `Multipass` (simulação) |
| **Google AI & Cloud** | `Gemini CLI (Google)`, `Google AI Studio`, `Google Firebase Studio` |
| **Editor** | `VS Code` (configurado no macOS Catalina)                  |
| **Auxiliares** | `OpenAI CLI`, `Azure Data Studio`, `Node.js (CLI tooling)` |

---

### 📦 Estrutura do Projeto (inicial)

<pre><code>
~/Projetos/DriverHub
├── DriverHub.sln
├── src/
│   ├── DriverHub.API/
│   ├── DriverHub.Application/
│   ├── DriverHub.Domain/
│   └── DriverHub.Infrastructure/
├── docker/
│   └── docker-compose.yml
└── README.md
</code></pre>

---

### 🚀 Funcionalidades (em desenvolvimento)

- [x] Criação da estrutura de pastas
- [x] Configuração do ambiente com VS Code e Docker
- [x] Integração com GitHub
- [ ] Criação da solução .NET com Clean Architecture
- [ ] Conexão com banco de dados PostgreSQL
- [ ] Criação do painel para motoristas
- [ ] Criação do painel para administradores
- [ ] Explorar Gemini CLI e AI Studio para integração AI
- [ ] Deploy em ambiente VPS (Hostinger)

---

### 👨‍💻 Status do Projeto

> 🟡 **Em desenvolvimento ativo (foco em aprendizado prático)** > 🔄 Atualizado continuamente com base na evolução do ambiente local, decisões técnicas e integração com ferramentas Google AI.

---

### 💡 Ideias Futuras

- Exportação de relatórios em PDF
- Integração com API da Uber/99
- Modo offline (Progressive Web App)
- Notificações para administradores
- Uso avançado do Google AI Studio e Firebase Studio para automações e analytics

---

### 📚 Finalidade Educacional

Este projeto é parte de um processo de **aprendizado prático e aprofundado em desenvolvimento moderno**, usando tecnologias **viáveis mesmo em equipamentos mais antigos**, como o macOS Catalina, e ferramentas modernas de AI do Google.

---

### 📬 Contribuições e Contato

Este projeto é pessoal, mas aberto a sugestões, ideias e discussões para fins didáticas.

---

### 🧠 Powered by Estudo + Café ☕ + Google AI 🚀