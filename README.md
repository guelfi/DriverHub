<h1 align="center">🚗 DriverHub</h1>
<p align="center">💡 Micro SaaS para motoristas de aplicativo com foco em controle financeiro diário.</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/versão-.NET%208.0-blueviolet?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/postgresql-rodando%20local-blue?style=for-the-badge"/>
</p>

---

## 📦 Tecnologias Utilizadas

- ⚙️ **Back-end**: ASP.NET Core 8 + DDD + JWT
- 🗃️ **Banco de Dados**: PostgreSQL (instalado localmente)
- 🎨 **Front-end**: HTML/CSS (mobile first)
- 🧠 **IA auxiliar**: OpenAI CLI (via terminal)
- 🐘 **ORM**: Entity Framework Core
- 🐙 **Versionamento**: Git + GitHub
- 🐳 **Docker**: Usado apenas para simulação de produção
- 📊 **Dashboard**: Web para administrador

---

## ✅ Etapas Concluídas

- [x] Instalação do VS Code compatível com macOS Catalina
- [x] Instalação do Git + geração de chave SSH + push para GitHub
- [x] Criação da estrutura inicial da pasta `~/Projetos/DriverHub`
- [x] PostgreSQL instalado localmente
- [x] Node.js, Python 3.8, pip e OpenAI CLI instalados
- [x] Docker instalado (CLI apenas)
- [x] Configuração do ambiente local concluída 🎉

---

## 🗺️ Plano de Desenvolvimento

### 🔧 Etapa 1 — Criação da solução

- [ ] Criar a solution `DriverHub.sln`
- [ ] Criar projetos:
  - [ ] `DriverHub.API` — Web API
  - [ ] `DriverHub.Application` — Casos de uso
  - [ ] `DriverHub.Domain` — Entidades e interfaces
  - [ ] `DriverHub.Infrastructure` — Repositórios e contexto

### 🛢️ Etapa 2 — Banco de Dados

- [x] PostgreSQL instalado no macOS
- [ ] Criar migrations e aplicar com EF Core
- [ ] Criar `DbContext` e entidades

### 🔐 Etapa 3 — Autenticação

- [ ] Implementar autenticação com JWT
- [ ] Criar endpoints de login e registro

### 📈 Etapa 4 — Funcionalidades

- [ ] Registro de corridas por dia e plataforma
- [ ] Cálculo de:
  - Quilometragem
  - Faturamento bruto
  - Custos operacionais
  - Lucro líquido
  - R$/km e R$/hora

### 📊 Etapa 5 — Dashboard Admin

- [ ] Visualização de dados agregados
- [ ] Exibir métricas de todos os motoristas (sem dados sensíveis)

### 🖥️ Etapa 6 — Front-end

- [ ] Interface responsiva (HTML/CSS mobile first)
- [ ] Tela de entrada de dados
- [ ] Tela de relatórios

### 🚀 Etapa 7 — Deploy

- [ ] Preparar ambiente Docker para simulação de produção
- [ ] Configurar VPS (Hostinger) com docker-compose
- [ ] Publicar versão funcional

---

## 🧱 Estrutura Esperada

```shell
DriverHub/
├── DriverHub.sln
├── README.md
├── docker/
│   └── docker-compose.yml
├── src/
│   ├── DriverHub.API/
│   ├── DriverHub.Application/
│   ├── DriverHub.Domain/
│   └── DriverHub.Infrastructure/

🔐 Segurança e Privacidade
✅ Dados individuais dos motoristas não são acessíveis por administradores.

✅ O sistema calcula e exibe somente dados agregados e estatísticos.

✅ JWT protege a autenticação e os endpoints.

👨‍💻 Autor
Marco Guelfi
Desenvolvedor independente e criador do DriverHub.
Este projeto é um experimento real de automação para motoristas de aplicativo.

🌱 Contribuições
Contribuições serão bem-vindas após o MVP.
Foco atual: arquitetura, testes e automações.