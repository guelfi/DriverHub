# Especificação do Projeto DriverHub.FrontendWeb (PWA para Motoristas)

## 1. Introdução

Este documento detalha a especificação para o desenvolvimento do `DriverHub.FrontendWeb`, um Progressive Web App (PWA) destinado a motoristas. O objetivo é fornecer uma interface leve, moderna e responsiva que permita aos motoristas acessar suas informações e funcionalidades essenciais diretamente de seus dispositivos móveis, sem a necessidade de instalação via lojas de aplicativos.

**Público-alvo:** Motoristas cadastrados no sistema DriverHub.

## 2. Tecnologias

*   **Frontend:** React.js (com TypeScript para maior robustez e tipagem).
*   **Estilização/UI:** Material Design UI (biblioteca de componentes React que implementa as diretrizes do Material Design da Google).
*   **Funcionalidade PWA:** Utilização de Service Workers para caching e offline capabilities, e um Web App Manifest para instalação na tela inicial.
*   **Comunicação com API:** Axios para requisições HTTP à `DriverHub.API`.

## 3. Funcionalidades Principais (Fase 1)

### 3.1. Autenticação

*   **Tela de Login:**
    *   Campos para `email` e `senha`.
    *   Botão de "Entrar".
    *   Validação de formulário (campos obrigatórios, formato de e-mail).
    *   Exibição de mensagens de erro claras em caso de falha no login.
    *   Integração com o endpoint de autenticação da `DriverHub.API` (`/api/auth/login`).
    *   Armazenamento seguro do token de autenticação (JWT) após login bem-sucedido (ex: Local Storage ou Session Storage).
    *   Redirecionamento para a `HomeScreen` após login.

### 3.2. Gestão de Temas (Claro/Escuro)

*   **Componente de Alternância de Tema:**
    *   Um ícone intuitivo (ex: sol/lua) que permite ao usuário alternar entre o tema claro e o tema escuro.
    *   Este componente deve estar visível tanto na `Tela de Login` quanto na `HomeScreen`.
    *   **Persistência:** A escolha do tema do usuário deve ser salva (ex: no Local Storage) e aplicada automaticamente em futuras sessões.

### 3.3. HomeScreen (Dashboard do Motorista)

*   **Layout:** Leve, moderno e otimizado para dispositivos móveis.
*   **Componente de Perfil do Usuário:**
    *   Um ícone de perfil (ex: avatar ou silhueta de pessoa) localizado em uma área de fácil acesso (ex: canto superior direito).
    *   Ao clicar no ícone, um menu ou modal deve ser exibido contendo:
        *   **Dados do Motorista Conectado:** Exibição de informações relevantes do motorista (Nome, Sobrenome, Email, Número de Celular, etc.), obtidas da `DriverHub.API` (ex: endpoint de perfil do motorista).
        *   **Opção "Sair" (Logout):** Ao clicar, o token de autenticação deve ser removido e o usuário redirecionado para a `Tela de Login`.
*   **Componentes de Iconografia:** Utilizar ícones modernos e relevantes do Material Design.

### 3.4. Design e Experiência do Usuário (UX)

*   **Material Design UI:** Todos os componentes da interface (botões, campos de texto, menus, etc.) devem seguir as diretrizes e utilizar os componentes da biblioteca Material Design UI para React.
*   **Botões Harmônicos:** Estilo consistente e visualmente agradável para todos os botões.
*   **Responsividade:** O layout deve se adaptar perfeitamente a diferentes tamanhos de tela de dispositivos móveis.

## 4. Estrutura do Projeto (Inicial)

A estrutura inicial do projeto `DriverHub.FrontendWeb` será organizada da seguinte forma:

```
src/DriverHub.FrontendWeb/
├── public/
│   ├── index.html
│   ├── manifest.json         # Manifest do PWA
│   └── service-worker.js     # Service Worker para caching e offline
├── src/
│   ├── assets/               # Imagens, ícones, etc.
│   ├── components/
│   │   ├── ThemeToggle.tsx   # Componente para alternar tema
│   │   └── UserProfileIcon.tsx # Componente de ícone de perfil
│   ├── pages/
│   │   ├── Login.tsx         # Tela de Login
│   │   └── HomeScreen.tsx    # Tela principal do motorista
│   ├── services/
│   │   ├── AuthService.ts    # Lógica de autenticação e API
│   │   └── ThemeService.ts   # Lógica de gestão de tema
│   ├── App.tsx               # Componente principal da aplicação
│   ├── index.tsx             # Ponto de entrada da aplicação
│   └── styles/               # Estilos globais, variáveis de tema
└── tsconfig.json             # Configuração TypeScript
```

## 5. Próximos Passos

1.  [x] **Criação do Projeto Base:** Configurar um novo projeto React com TypeScript e Vite.
2.  [x] **Configuração do Ambiente de Desenvolvimento:** Configurar o Vite para acesso via IP local e integrar ao `servershub.sh`.
3.  [ ] **Configuração do Material Design UI:** Instalar e configurar a biblioteca Material Design UI.
4.  [ ] **Implementação da Tela de Login:** Desenvolver a interface e a lógica de autenticação.
5.  [ ] **Implementação do Sistema de Temas:** Desenvolver o componente `ThemeToggle` e a lógica de persistência.
6.  [ ] **Implementação da HomeScreen:** Desenvolver o layout básico e o componente `UserProfileIcon`.

Este documento servirá como guia para o desenvolvimento do `DriverHub.FrontendWeb`. Qualquer alteração ou adição de funcionalidade será refletida aqui.

## 6. Funcionalidades Adicionais no DriverHub.Dashboard

Esta seção descreve as novas funcionalidades a serem implementadas no `DriverHub.Dashboard` para melhorar a experiência do administrador.

### 6.1. Preferência de Tema Persistente

*   **Localização:** A opção para alternar entre tema claro e escuro deve ser acessível através do item "Configuração" na sidebar do Dashboard.
*   **Persistência:** A escolha do tema do administrador deve ser salva (ex: no Local Storage) e aplicada automaticamente em futuras sessões.

### 6.2. Exibição do Perfil do Administrador

*   **Localização:** As informações do perfil do administrador devem ser exibidas ao clicar na opção "Perfil" dentro do ícone de perfil de usuário, localizado na parte superior direita do Dashboard.
*   **Conteúdo:** Exibir dados relevantes do administrador logado (Nome, Email, etc.).

