# Product Requirements Document (PRD) - DriverHub

## 1. Dashboard

### 1.1. Sidebar

*   **Funcionalidade:** Alterar sidebar

*   **Requisitos:**
    *   Remover do sidebar o texto "Menu Principal"

### 1.2. Visualização de Motoristas

*   **Funcionalidade:** Exibir uma lista de motoristas cadastrados.
*   **Requisitos:**
    *   A alteração e inclusão de motoristas não são permitidas através desta interface.
    *   A lista deve ser paginada, exibindo 5 motoristas por página.
    *   Os controles de paginação devem estar localizados ao lado do título "Lista de Motoristas".
    *   Cada linha da lista deve ser clicável.
    *   Ao clicar em uma linha, um card com os dados detalhados do motorista deve ser exibido.

### 1.3. Visualização de Veículos

*   **Funcionalidade:** Exibir uma lista de veículos cadastrados.
*   **Requisitos:**
    *   A alteração e inclusão de veículos não são permitidas através desta interface.
    *   A lista deve ser paginada, exibindo 5 veículos por página.
    *   Os controles de paginação devem estar localizados ao lado do título "Lista de Veículos".
    *   Cada linha da lista deve ser clicável.
    *   Ao clicar em uma linha, um card com os dados detalhados do veículo deve ser exibido.
    *   Os seguintes campos devem ser exibidos nos detalhes do veículo: Marca, Modelo, Ano Fabricação, Ano Modelo, Quilometragem e Autonomia.

## 2. FrontendWeb

### 2.1. Login e Cadastro

*   **Funcionalidade:** Permitir que novos motoristas se cadastrem na plataforma.
*   **Requisitos:**
    *   A tela de login deve conter uma opção para o motorista iniciar o processo de cadastro.

### 2.2. Tela Inicial (HomeScreen)

*   **Funcionalidade:** Apresentar ao motorista as principais funcionalidades da aplicação após o login.
*   **Requisitos:**
    *   O design da HomeScreen deve seguir o mesmo padrão visual do Dashboard.
    *   No canto superior direito, deve haver uma caixa de seleção (similar à do Dashboard) que, ao ser acionada, exibe as seguintes opções:
        *   **Meus Dados:** Um card para a manutenção dos dados cadastrais do motorista.
        *   **Meus Veículos:** Redireciona para uma página com uma lista dos veículos do motorista.

### 2.3. Funcionalidades Principais

*   **Funcionalidade:** Fornecer ferramentas para auxiliar o motorista em seu dia a dia.
*   **Requisitos:**
    *   A HomeScreen deve conter botões para as seguintes funcionalidades:
        *   **Meu KM:** Uma ferramenta para ajudar o motorista a calcular seu KM ideal.
        *   **Análise de Resultado:** Uma ferramenta para ajudar o motorista a analisar seus resultados por dia ou período.
