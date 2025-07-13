# Guia de Início Rápido: DriverHub

Este guia fornece instruções sobre como executar os testes da solução e como criar o primeiro usuário administrador.

## 1. Executando Todos os Testes

Para garantir a integridade do projeto e verificar se todas as funcionalidades estão operando corretamente, siga os passos abaixo para compilar a solução e executar os testes unitários:

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

## 2. Criando o Primeiro Usuário Administrador

Para o primeiro acesso ao dashboard administrativo, é necessário criar um usuário com a função de `Admin`. Este processo é feito através de um script CLI, garantindo que apenas um administrador inicial seja configurado.

1.  **Certifique-se de que a API DriverHub esteja em execução.** Se não estiver, inicie-a usando o script `servershub.sh`:
    ```bash
    bash servershub.sh start
    ```

2.  **Execute o script de criação do administrador** a partir do diretório raiz do projeto. Substitua `<email>`, `<senha>`, `<nome>` e `<sobrenome>` pelas informações desejadas para o seu usuário administrador.
    ```bash
    ./create_admin.sh <email> <senha> <nome> <sobrenome>
    ```
    *   **Exemplo:**
        ```bash
        ./create_admin.sh admin@driverhub.com SenhaSegura123 Admin User
        ```

    *   **Saída Esperada:**
        *   Se o administrador for criado com sucesso: `Usuário administrador 'admin@driverhub.com' registrado com sucesso!`
        *   Se já existir um administrador: `Erro: Já existe um usuário administrador. Não é permitido criar mais de um administrador via este script.`
        *   Em caso de outros erros, a resposta da API será exibida.

**Importante:** Este script deve ser executado apenas uma vez para configurar o administrador inicial. Para criar usuários adicionais com diferentes níveis de acesso no futuro, você deverá usar a interface administrativa do dashboard (uma vez que ela esteja desenvolvida).

---

**Lembrete:** Após realizar alterações no código ou na configuração, lembre-se de realizar o `git push` manualmente para salvar suas alterações no repositório remoto.
