# Contexto do Projeto DriverHub (Gerado por Gemini CLI)

Este documento resume a análise da estrutura e dos componentes do projeto DriverHub, realizada pelo Gemini CLI, para manter o contexto atualizado e facilitar o desenvolvimento contínuo.

## 1. Visão Geral da Solução

A solução `DriverHub.sln` é organizada seguindo os princípios da Clean Architecture e Domain-Driven Design (DDD), com os seguintes projetos principais:

*   **`DriverHub.API`**: Camada de apresentação (Web API), responsável por expor os endpoints RESTful, lidar com requisições HTTP, autenticação e tratamento global de exceções.
*   **`DriverHub.Application`**: Camada de aplicação, contendo a lógica de negócio, serviços de aplicação, DTOs e interfaces de serviço. Orquestra as operações e interage com o domínio e a infraestrutura.
*   **`DriverHub.Domain`**: Camada de domínio, o coração da aplicação. Contém as entidades de negócio, interfaces de repositório e regras de negócio. É independente de outras camadas.
*   **`DriverHub.Infrastructure`**: Camada de infraestrutura, responsável pela implementação de detalhes técnicos, como acesso a dados (Entity Framework Core), repositórios e serviços externos.
*   **`DriverHub.Tests`**: Projeto de testes unitários, utilizando xUnit e Moq para garantir a qualidade e a testabilidade do código.

## 2. Componentes Chave e Implementações

### 2.1. `DriverHub.Domain`
*   **Entidades**:
    *   `Motorista.cs`: Define a entidade `Motorista` com propriedades como `Id`, `Nome`, `Email`, `SenhaHash`, `Sal`, `NumeroCelular`, `AluguelSemanalVeiculo`, `DiasTrabalhadosPorSemana`, `AutonomiaVeiculoKmPorLitro`, `DataCadastro` e `Role`. Inclui um `enum Role` para `Motorista` e `Admin`.
    *   `Viagem.cs`: Define a entidade `Viagem` com propriedades como `Id`, `MotoristaId`, `DataViagem`, `Origem`, `Destino`, `DistanciaKm`, `ValorRecebido`, `CustoCombustivel` e `Lucro`. Possui uma propriedade de navegação para `Motorista`.
*   **Repositórios**:
    *   `Repositories/IMotoristaRepository.cs`: Interface que define o contrato para operações CRUD em `Motorista` (`GetByIdAsync`, `GetByEmailAsync`, `AddAsync`, `UpdateAsync`, `DeleteAsync`).

### 2.2. `DriverHub.Application`
*   **DTOs**:
    *   `DTOs/LoginDto.cs`: Contém `Email` e `Password` para requisições de login.
    *   `DTOs/RegisterDto.cs`: Contém `Email`, `Password`, `Nome` e `Sobrenome` para requisições de registro.
*   **Serviços (Interfaces)**:
    *   `Services/IAuthService.cs`: Define métodos para registro e login (`RegisterAsync`, `LoginAsync`).
    *   `Services/IPasswordHasher.cs`: Define métodos para hash e verificação de senhas (`HashPassword`, `VerifyPassword`).
    *   `Services/ITokenService.cs`: Define método para geração de tokens JWT (`GenerateToken`).
*   **Serviços (Implementações)**:
    *   `Services/Implementations/AuthService.cs`: Implementa `IAuthService`, utilizando `IMotoristaRepository`, `IPasswordHasher` e `ITokenService`. Lida com a lógica de registro e login.
    *   `Services/Implementations/PasswordHasher.cs`: Implementa `IPasswordHasher` usando `Rfc2898DeriveBytes` para hashing seguro de senhas.
    *   `Services/Implementations/TokenService.cs`: Implementa `ITokenService`, gerando tokens JWT com base nas informações do motorista e uma chave configurada.

### 2.3. `DriverHub.Infrastructure`
*   **Acesso a Dados**:
    *   `Data/ApplicationDbContext.cs`: `DbContext` do Entity Framework Core, configurado com `DbSet` para `Motoristas` e `Viagens`. `OnModelCreating` define mapeamentos de entidades, chaves, índices (e-mail único para `Motorista`) e relacionamentos (cascata para `Viagem`). Atualmente configurado para usar banco de dados em memória.
*   **Repositórios (Implementações)**:
    *   `Repositories/MotoristaRepository.cs`: Implementa `IMotoristaRepository`, utilizando `ApplicationDbContext` para realizar operações CRUD assíncronas em `Motorista`. Inclui logging.

### 2.4. `DriverHub.API`
*   **Controladores**:
    *   `Controllers/AuthController.cs`: Controlador API que expõe endpoints `/register` e `/login`. Utiliza `IAuthService` para processar as requisições. Inclui um endpoint `ProtectedData` com `[Authorize]` para demonstrar a autenticação JWT.
*   **Middleware**:
    *   `Middleware/ExceptionHandlingMiddleware.cs`: Middleware global para tratamento de exceções. Captura exceções não tratadas, loga-as e retorna uma resposta JSON padronizada de erro.
*   **Configuração**:
    *   `Program.cs`: Ponto de entrada da aplicação. Configura o Serilog para logging, registra o `ApplicationDbContext` (em memória), injeta dependências para repositórios e serviços (incluindo `AuthService`, `PasswordHasher`, `TokenService`), configura a autenticação JWT Bearer e adiciona Swagger/OpenAPI. O middleware de tratamento de exceções é adicionado ao pipeline de requisições.

### 2.5. `DriverHub.Tests`
*   Projeto de testes unitários que referencia `DriverHub.Application`, `DriverHub.Infrastructure` e `DriverHub.API`. Utiliza `xUnit` e `Moq` para testes.

## 3. Alinhamento com `Prompt.md`

A análise confirma que a estrutura atual do projeto e as funcionalidades implementadas estão em total alinhamento com as seções "Funcionalidades Implementadas (Estado Atual)" e "Próximos Passos (a serem desenvolvidos)" do `Prompt.md`. O módulo de autenticação JWT, as entidades `Motorista` e `Viagem`, os repositórios, o tratamento de exceções e a configuração de logging estão implementados conforme o esperado.

## 4. Próximos Passos (Conforme `Prompt.md`)

Os próximos passos para o desenvolvimento incluem:
*   Implementar Entidades e Repositórios para `LancamentoDiario` e `DespesaPessoal`.
*   Desenvolver a Lógica de Negócio para Cálculos Financeiros.
*   Definir e Implementar Queries/Lógica para Relatórios Agregados.
*   Esboçar e Integrar o Frontend React Native.
*   Desenvolver o Frontend Administrativo.
*   Integrar com Banco de Dados PostgreSQL.
*   Explorar e Integrar Ferramentas Google AI.

Este documento será atualizado conforme o projeto evolui.
