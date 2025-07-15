# Guia de Início Rápido: DriverHub

Este guia fornece instruções sobre como executar os testes da solução e como criar e gerenciar usuários administradores.

## 1. Executando Testes da Solução (Backend)

Para garantir a integridade do projeto e verificar se todas as funcionalidades do backend estão operando corretamente, siga os passos abaixo para compilar a solução e executar os testes unitários:

1.  **Navegue até o diretório raiz do projeto DriverHub** no seu terminal:
    ```bash
    cd /Users/guelfi/Projetos/DriverHub
    ```

2.  **Compile a solução:** Este comando irá construir todos os projetos na solução, incluindo a API, a aplicação, a infraestrutura e os testes.
    ```bash
    dotnet build
    ```

3.  **Execute os testes unitários:** Após a compilação bem-sucedida, execute este comando para rodar todos os testes definidos no projeto `DriverHub.Tests`.
    ```bash
    dotnet test
    ```

    *   **Resultado Esperado:** Você deverá ver uma mensagem indicando que todos os testes foram aprovados, sem falhas ou erros.

## 2. Criando e Gerenciando Usuários Administradores (Ferramenta CLI)

Para criar ou listar usuários com a função de `Admin`, utilize o script CLI `create_admin.sh`.

*   **Para criar um novo administrador:**
    Execute o script a partir do diretório raiz do projeto. Substitua `<email>`, `<senha>`, `<nome>` e `<sobrenome>` pelas informações desejadas para o seu usuário administrador.
    ```bash
    ./create_admin.sh <email> <senha> <nome> <sobrenome>
    ```
    *   **Exemplo:**
        ```bash
        ./create_admin.sh novo.admin@driverhub.com SenhaForte456 Novo Admin
        ```

*   **Para listar administradores existentes:**
    ```bash
    ./create_admin.sh list-admins
    ```

    *   **Saída Esperada:** Verifique a saída do terminal e os logs da ferramenta de administração (`DriverHub.AdminTool`) para o resultado da operação.

## 3. Executando Testes do Dashboard (Frontend)

Para executar os testes do frontend (Dashboard), siga os passos abaixo:

1.  **Navegue até o diretório do projeto DriverHub.Dashboard** no seu terminal:
    ```bash
    cd /Users/guelfi/Projetos/DriverHub/src/DriverHub.Dashboard
    ```

2.  **Instale as dependências (se ainda não o fez):**
    ```bash
    npm install
    ```

3.  **Execute os testes:**
    ```bash
    npm test
    ```
    Este comando iniciará o test runner em modo interativo.

---      

**Lembrete:** Após realizar alterações no código ou na configuração, lembre-se de realizar o `git push` manualmente para salvar suas alterações no repositório remoto.
