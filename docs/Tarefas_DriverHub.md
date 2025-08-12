# Lista de Tarefas - DriverHub Frontend

## HomeScreen e Funcionalidades Principais

### Design e Estrutura da HomeScreen
- [x] Aplicar um design consistente com o Dashboard na HomeScreen.
- [x] Implementar um menu dropdown no canto superior direito.
  - [x] Adicionar a opção "Meus Dados" no dropdown.
    - [x] Redirecionar para a tela de manutenção de dados do motorista ao clicar em "Meus Dados".
  - [ ] Adicionar a opção "Meus Veículos" no dropdown.
    - [ ] Criar a tela "Veículos" com grid, botão "Adicionar", linhas clicáveis e campos especificados.
    - [ ] Redirecionar para a tela "Veículos" ao clicar em "Meus Veículos".
  - [x] Adicionar a opção "Configuração" no dropdown.
    - [x] Criar a tela "Configuração" com o seletor de tema.
    - [x] Redirecionar para a tela "Configuração" ao clicar em "Configuração".
- [x] Mover o seletor de tema do Header para a tela "Configuração".

### Botões de Funcionalidades na HomeScreen
- [x] Criar o botão "Meu KM".
- [x] Criar o botão "Análise de Resultado".
- [x] Criar o botão "Estatísticas".
- [x] Criar o botão "Veículos".
  - [ ] Redirecionar o botão "Veículos" da HomeScreen para a tela "Veículos".

### Telas Placeholder
- [x] Garantir que todas as opções de dropdown e botões levem a telas válidas.
- [x] Criar telas placeholder com texto centralizado horizontal e vertical para funcionalidades não implementadas.

### Usabilidade e Navegação
- [x] Adicionar iconografia para voltar à HomeScreen (ícone Home no Header).
- [x] Implementar funcionalidade de logoff para a opção 'Sair' no dropdown.
- [x] Adicionar ícones de navegação e usuário ao Header na tela de Login.
- [x] Remover os botões de escolha de tema claro e escuro da tela de Login.
- [x] Centralizar o texto "Bem-vindo de volta" e "Acesse sua conta" na tela de Login.
- [x] Garantir que o Header da tela de Login tenha a mesma altura e proporcionalidade do Header da HomeScreen.
- [x] Remover o texto da parte inferior da tela de Login.
- [x] Incluir texto "Não tem cadastro? clique aqui" na tela de Login, redirecionando para NewMotora.
- [x] Condicionar visibilidade dos ícones Home e Usuário apenas na HomeScreen.
- [x] Tornar o ícone Car e o nome DriverHub no Header não clicáveis.
- [x] Garantir que o Header tenha altura fixa de 50px.
- [x] Implementar rotas protegidas para páginas que exigem login.
- [x] Condicionar visibilidade dos ícones Home e Usuário apenas em páginas após login bem-sucedido.
- [x] Corrigir redirecionamento para HomeScreen após login bem-sucedido.
- [x] Remover o texto "Início bem-vindo de volta, motorista" da HomeScreen.
- [x] Remover o ícone Home e User do Header. (This was reverted, so I need to remove this task or mark it as reverted)
- [x] O Header deve ter 20rem. (This was changed to 50px, so I need to remove this task or mark it as changed)
- [x] Inserir o ícone Home e User logo abaixo do header. (This was reverted, so I need to remove this task or mark it as reverted)
- [x] Esse comportamento deve ser o mesmo em todas as telas que forem chamadas a partir dos cards ou das opções.