# Lista de Tarefas para o Desenvolvimento do DriverHub.FrontendWeb

Esta lista de tarefas detalha os passos para a implementação inicial do `DriverHub.FrontendWeb`, com base na `Especificacao_DriverHub_FrontendWeb.md`.

## Fase 1: Configuração e Telas Iniciais

### 1. Configuração do Projeto

*   [x] Criar um novo projeto React com TypeScript (usando Vite).
    *   Comando: `npm create vite@latest driverhub.frontendweb -- --template react-ts`
*   [x] Instalar e configurar as dependências básicas:
    *   `react-router-dom` para roteamento.
    *   `axios` para requisições HTTP.
    *   `@mui/material`, `@emotion/react`, `@emotion/styled` para Material Design UI.
    *   `@mui/icons-material` para ícones do Material Design.
*   [ ] Configurar o TypeScript (`tsconfig.json`).
*   [ ] Configurar o ESLint e Prettier para padronização de código.

### 2. Implementação do Sistema de Temas (Claro/Escuro)

*   [ ] Definir as paletas de cores para os temas claro e escuro usando o sistema de temas do Material UI.
*   [ ] Criar um `ThemeContext` para gerenciar o tema atual da aplicação.
*   [ ] Implementar o `ThemeToggle.tsx` (componente de ícone para alternar o tema).
*   [ ] Adicionar lógica para persistir a escolha do tema no Local Storage.
*   [ ] Aplicar o tema globalmente na aplicação.

### 3. Desenvolvimento da Tela de Login

*   [ ] Criar o componente `Login.tsx` na pasta `pages`.
*   [ ] Desenhar a interface da tela de login com componentes do Material UI (TextField para email/senha, Button para login).
*   [ ] Implementar a validação de formulário (ex: usando `react-hook-form` e `zod`).
*   [ ] Criar o `AuthService.ts` na pasta `services` para lidar com a comunicação com a `DriverHub.API` (endpoint `/api/auth/login`).
*   [ ] Implementar a lógica de login: enviar credenciais, receber token JWT, armazenar token.
*   [ ] Redirecionar para a `HomeScreen` em caso de sucesso.
*   [ ] Exibir mensagens de erro amigáveis em caso de falha.
*   [ ] Integrar o `ThemeToggle` na tela de login.

### 4. Desenvolvimento da HomeScreen

*   [ ] Criar o componente `HomeScreen.tsx` na pasta `pages`.
*   [ ] Desenhar o layout básico da `HomeScreen` com componentes do Material UI.
*   [ ] Integrar o `ThemeToggle` na `HomeScreen`.
*   [ ] Criar o componente `UserProfileIcon.tsx` na pasta `components`.
*   [ ] Implementar a lógica do `UserProfileIcon`:
    *   Exibir um ícone de perfil.
    *   Ao clicar, exibir um menu/modal com os dados do motorista (Nome, Sobrenome, Email, Número de Celular).
    *   Adicionar um botão "Sair" (Logout) que remova o token e redirecione para a tela de login.
*   [ ] Criar um serviço (ex: `MotoristaService.ts` ou estender `AuthService.ts`) para buscar os dados do motorista logado da `DriverHub.API`.

### 5. Configuração PWA (Progressive Web App)

*   [ ] Criar o arquivo `manifest.json` na pasta `public`.
*   [ ] Criar o arquivo `service-worker.js` na pasta `public`.
*   [ ] Registrar o Service Worker no `index.tsx`.
*   [ ] Testar a instalação do PWA em um dispositivo móvel.

## Próximos Passos (Após a Fase 1)

*   Implementar outras funcionalidades do motorista (lançamento de despesas, visualização de métricas, etc.).
*   Refinar o design e a experiência do usuário.
*   Adicionar testes unitários e de integração.

Esta lista será atualizada conforme o projeto avança.

## Fase 2: Melhorias no DriverHub.Dashboard

### 1. Preferência de Tema Persistente

*   [ ] Implementar a alternância de tema (claro/escuro) no Dashboard.
*   [ ] Adicionar a opção de tema no item "Configuração" da sidebar.
*   [ ] Salvar a preferência de tema do administrador no Local Storage.
*   [ ] Aplicar o tema salvo automaticamente em futuras sessões.

### 2. Exibição do Perfil do Administrador

*   [ ] Criar ou adaptar o componente de perfil do usuário no Dashboard.
*   [ ] Ao clicar no ícone de perfil (canto superior direito), exibir um menu/modal com os dados do administrador logado (Nome, Email).
*   [ ] Integrar com a API para buscar os dados do administrador.
