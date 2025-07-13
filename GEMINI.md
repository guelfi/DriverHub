# 🚀 Contexto do Projeto DriverHub (Gerado por Gemini CLI)

Este documento resume a análise da estrutura e dos componentes do projeto DriverHub, realizada pelo Gemini CLI, para manter o contexto atualizado e facilitar o desenvolvimento contínuo.

## 1. 🏗️ Visão Geral da Solução

A solução `DriverHub.sln` é organizada seguindo os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**, com os seguintes projetos principais:

*   **`DriverHub.API`**: Camada de apresentação (Web API), responsável por expor os endpoints RESTful, lidar com requisições HTTP, autenticação e tratamento global de exceções.
*   **`DriverHub.Application`**: Camada de aplicação, contendo a lógica de negócio, serviços de aplicação, DTOs e interfaces de serviço. Orquestra as operações e interage com o domínio e a infraestrutura.
*   **`DriverHub.Domain`**: Camada de domínio, o *coração da aplicação*. Contém as entidades de negócio, interfaces de repositório e regras de negócio. É independente de outras camadas.
*   **`DriverHub.Infrastructure`**: Camada de infraestrutura, responsável pela implementação de detalhes técnicos, como acesso a dados (Entity Framework Core), repositórios e serviços externos.
*   **`DriverHub.Tests`**: Projeto de testes unitários, utilizando **xUnit** e **Moq** para garantir a qualidade e a testabilidade do código.

## 2. 🧩 Componentes Chave e Implementações

### 2.1. `DriverHub.Domain`

*   **Entidades** 🚗:
    *   `Motorista.cs`: Define a entidade `Motorista` com propriedades como `Id`, `Nome`, `Sobrenome`, `Email`, `SenhaHash`, `Sal`, `NumeroCelular`, `AluguelSemanalVeiculo`, `DiasTrabalhadosPorSemana`, `AutonomiaVeiculoKmPorLitro`, `DataCadastro` e `Role`. Inclui um `enum Role` para `Motorista` e `Admin`.
    *   `Viagem.cs`: Define a entidade `Viagem` com propriedades como `Id`, `MotoristaId`, `DataViagem`, `Origem`, `Destino`, `DistanciaKm`, `ValorRecebido`, `CustoCombustivel` e `Lucro`. Possui uma propriedade de navegação para `Motorista`.
*   **Repositórios** 🗄️:
    *   `Repositories/IMotoristaRepository.cs`: Interface que define o contrato para operações CRUD em `Motorista` (`GetByIdAsync`, `GetByEmailAsync`, `AddAsync`, `UpdateAsync`, `DeleteAsync`).

### 2.2. `DriverHub.Application`

*   **DTOs** 📦:
    *   `DTOs/LoginDto.cs`: Contém `Email` e `Password` para requisições de login.
    *   `DTOs/RegisterDto.cs`: Contém `Email`, `Password`, `Nome` e `Sobrenome` para requisições de registro.
*   **Serviços (Interfaces)** 🤝:
    *   `Services/IAuthService.cs`: Define métodos para registro e login (`RegisterAsync(..., string sobrenome)`, `LoginAsync`).
    *   `Services/IPasswordHasher.cs`: Define métodos para hash e verificação de senhas (`HashPassword`, `VerifyPassword`).
    *   `Services/ITokenService.cs`: Define método para geração de tokens JWT (`GenerateToken`).
*   **Serviços (Implementações)** ⚙️:
    *   `Services/Implementations/AuthService.cs`: Implementa `IAuthService`, utilizando `IMotoristaRepository`, `IPasswordHasher` e `ITokenService`. Lida com a lógica de registro e login, agora aceitando `sobrenome`.
    *   `Services/Implementations/PasswordHasher.cs`: Implementa `IPasswordHasher` usando `Rfc2898DeriveBytes` para hashing seguro de senhas.
    *   `Services/Implementations/TokenService.cs`: Implementa `ITokenService`, gerando tokens JWT com base nas informações do motorista e uma chave configurada.

### 2.3. `DriverHub.Infrastructure`

*   **Acesso a Dados** 💾:
    *   `Data/ApplicationDbContext.cs`: `DbContext` do Entity Framework Core, configurado com `DbSet` para `Motoristas` e `Viagens`. `OnModelCreating` define mapeamentos de entidades, chaves, índices (e-mail único para `Motorista`) e relacionamentos (cascata para `Viagem`). Configurado para usar **PostgreSQL** com convenção `snake_case`.
*   **Repositórios (Implementações)** 🗄️:
    *   `Repositories/MotoristaRepository.cs`: Implementa `IMotoristaRepository`, utilizando `ApplicationDbContext` para realizar operações CRUD assíncronas em `Motorista`. Inclui logging.

### 2.4. `DriverHub.API`

*   **Controladores** 🌐:
    *   `Controllers/AuthController.cs`: Controlador API que expõe endpoints `/register` e `/login`. Utiliza `IAuthService` para processar as requisições. Agora passa `sobrenome` para `RegisterAsync` e retorna `Nome` e `Sobrenome` na resposta de login. Inclui um endpoint `ProtectedData` com `[Authorize]` para demonstrar a autenticação JWT.
*   **Middleware** 🛡️:
    *   `Middleware/ExceptionHandlingMiddleware.cs`: Middleware global para tratamento de exceções. Captura exceções não tratadas, loga-as e retorna uma resposta JSON padronizada de erro.
*   **Configuração** 🛠️:
    *   `Program.cs`: Ponto de entrada da aplicação. Configura o **Serilog** para logging, registra o `ApplicationDbContext` (agora com PostgreSQL e `snake_case`), injeta dependências para repositórios e serviços (incluindo `AuthService`, `PasswordHasher`, `TokenService`, `IMotoristaRepository`), configura a autenticação **JWT Bearer** e adiciona **Swagger/OpenAPI**. O middleware de tratamento de exceções é adicionado ao pipeline de requisições. **CORS** configurado para permitir todas as origens (para desenvolvimento).

### 2.5. `DriverHub.Tests`

*   Projeto de testes unitários que referencia `DriverHub.Application`, `DriverHub.Infrastructure` e `DriverHub.API`. Utiliza `xUnit` e `Moq` para testes. Testes de `AuthService` atualizados para incluir o parâmetro `sobrenome`. 

### 2.6. `DriverHub.MobileApp` (Frontend Mobile) 📱

*   **Estrutura:** Projeto **React Native** com pastas `src/components`, `src/hooks`, `src/pages`, `src/services`.
*   **Autenticação:**
    *   `pages/LoginScreen.js`: Tela de login com validação de e-mail e senha, funcionalidade de mostrar/ocultar senha, e exibição de mensagens de erro na tela. Redireciona para `HomeScreen` após login bem-sucedido, passando `nome` e `sobrenome`.
    *   `pages/RegisterScreen.js`: Tela de cadastro com campos para `Nome`, `Sobrenome`, `Email` e `Senha`, validação de campos obrigatórios e formato de e-mail, funcionalidade de mostrar/ocultar senha, e exibição de mensagens de erro. Após cadastro bem-sucedido, exibe mensagem de sucesso e botão para ir para o login.
    *   `services/AuthService.js`: Serviço que encapsula chamadas à API de autenticação. Agora envia `nome` e `sobrenome` no registro e espera `token`, `nome` e `sobrenome` na resposta de login. Inclui tratamento aprimorado de mensagens de erro da API (incluindo `ValidationProblemDetails`).
*   **Navegação:** `App.js` configura a navegação entre `LoginScreen`, `RegisterScreen` e `HomeScreen` usando `@react-navigation/native` e `@react-navigation/native-stack`.
*   **Tema:** Implementação de modo claro/escuro usando `src/context/ThemeContext.js` e `useTheme` hook, com alternância de tema nas telas de autenticação.
*   **Home Screen:** `pages/HomeScreen.js` é a tela inicial que exibe uma mensagem de boas-vindas e o nome e sobrenome do usuário logado.

## 3. ✅ Alinhamento com `Prompt.md`

A análise confirma que a estrutura atual do projeto e as funcionalidades implementadas estão em total alinhamento com as seções "Funcionalidades Implementadas (Estado Atual)" e "Próximos Passos (a serem desenvolvidos)" do `Prompt.md`. O módulo de autenticação JWT, as entidades `Motorista` e `Viagem`, os repositórios, o tratamento de exceções e a configuração de logging estão implementados conforme o esperado. O frontend mobile foi iniciado com as telas de autenticação, navegação e tema, e agora inclui o campo de sobrenome e o fluxo de login/cadastro aprimorado.

## 4. ➡️ Próximos Passos (Conforme `Prompt.md`)

**Etapa Concluída:**
*   **Integração com Banco de Dados PostgreSQL:** O projeto agora utiliza PostgreSQL para persistência de dados, com tabelas e colunas configuradas para `snake_case`. A persistência dos dados de `Motorista` foi implementada e verificada.

**Próximos Passos:**
*   Implementar Entidades e Repositórios para `LancamentoDiario` e `DespesaPessoal`.
*   Desenvolver a Lógica de Negócio para Cálculos Financeiros.
*   Definir e Implementar Queries/Lógica para Relatórios Agregados.
*   Esboçar e Integrar o Frontend React Native (continuar o desenvolvimento).
*   Desenvolver o Frontend Administrativo.
*   Explorar e Integrar Ferramentas Google AI.

## 5. 🛠️ Ferramentas de Desenvolvimento

*   **`servershub.sh`**: Script unificado para gerenciar os serviços de desenvolvimento (API e Aplicativo Móvel). Suporta os comandos `start` (inicia os serviços em segundo plano e exibe IPs/portas), `stop` (encerra os serviços) e `status` (verifica o status atual e exibe IPs/portas).
    *   **Atualização Recente (13/07/2025):** Corrigida a detecção da porta do aplicativo móvel na função `status_servers` para `5218` (anteriormente `8081`). A lógica de parada de serviços na função `stop_servers` também foi unificada para usar a porta correta (`5218`) para o aplicativo móvel.
    *   **Melhorias na Detecção do Aplicativo Móvel (13/07/2025):** O script foi aprimorado para detectar corretamente o status do aplicativo móvel na porta 5218, removendo a dependência de um arquivo PID e verificando diretamente a porta em uso. Os arquivos de contexto `context.md` e `context_for_manual_test.md` foram unificados e migrados para `GEMINI.md`.

Este documento será atualizado conforme o projeto evolui. 🔄

---

## Contexto para Testes Manuais (Adicionado em 13 de julho de 2025)

Este arquivo resume as alterações feitas no script `servershub.sh` para melhorar a detecção do status do aplicativo móvel.

### Alterações Realizadas:

O script `servershub.sh` foi modificado para:

1.  Remover a dependência de um arquivo PID (`MOBILE_PID_FILE`) para o aplicativo móvel, que não estava sendo gerado de forma consistente pelo `npm start` do Expo.
2.  Ajustar a função `start_servers` para não tentar salvar o PID do aplicativo móvel em um arquivo.
3.  Ajustar a função `status_servers` para verificar o status do aplicativo móvel diretamente pela porta 5218, usando `lsof`.
4.  Remover a limpeza do arquivo PID do aplicativo móvel na função `stop_servers`.

### Como Verificar o Status dos Serviços:

Para verificar o status atual dos serviços (API e Aplicativo Móvel), execute o seguinte comando no terminal, a partir do diretório raiz do projeto:

```bash
bash servershub.sh status
```

**Resultado Esperado:**

Você deverá ver uma saída similar a esta, indicando que ambos os serviços estão rodando (se estiverem ativos):

```
Verificando o status dos serviços...
---------------------------------------------------
API DriverHub: Rodando na porta 5217 (PID XXXX)
Aplicativo Móvel DriverHub: Rodando na porta 5218 (PID YYYY)

Obtendo o endereço IP do seu notebook...
Endereço IP do seu notebook: ZZZ.ZZZ.ZZZ.ZZZ

Para testes no celular (conectado à mesma rede Wi-Fi):
Acesse no navegador do celular: http://ZZZ.ZZZ.ZZZ.ZZZ:5218
---------------------------------------------------
```

Onde `XXXX` e `YYYY` serão os PIDs dos processos e `ZZZ.ZZZ.ZZZ.ZZZ` será o endereço IP do seu notebook.

Após seus testes manuais, você pode me informar para continuarmos com o desenvolvimento do projeto.
