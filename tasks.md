# ✅ Lista de Tarefas - DriverHub

Este arquivo rastreia as tarefas de desenvolvimento do projeto.

## 🔥 Prioridade Alta

- [ ] **[TASK-001]** Desenvolver a Lógica de Negócio para Cálculos Financeiros no `DriverHub.Application`.
- [ ] **[TASK-002]** Definir e Implementar as Queries/Lógica para Relatórios Agregados no backend.

## 🟡 Prioridade Média

- [ ] **[TASK-003]** Re-estilizar e refatorar a interface do `DriverHub.MobileApp` para melhorar a usabilidade e a experiência do usuário.
- [ ] **[TASK-004]** Implementar a visualização dos relatórios financeiros no `DriverHub.Dashboard`.
- [ ] **[TASK-005]** Continuar o desenvolvimento do `DriverHub.MobileApp`, integrando a lógica financeira e de relatórios.

## ⚪ Prioridade Baixa

- [ ] **[TASK-006]** Explorar e prototipar a integração com Ferramentas de Google AI para otimização ou análise preditiva.

## 🚀 Implantação e CI/CD (Pré-Produção)

- [ ] **[TASK-007]** **Configurar VM:** Instalar Docker e Docker Compose na VM da Oracle Cloud (Ubuntu 20.04).
  ```bash
  # 1. Atualiza os pacotes e instala as dependências necessárias
  sudo apt-get update
  sudo apt-get install -y ca-certificates curl gnupg

  # 2. Adiciona a chave GPG oficial do Docker
  sudo install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  sudo chmod a+r /etc/apt/keyrings/docker.gpg

  # 3. Adiciona o repositório do Docker ao Apt
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  # 4. Instala o Docker Engine e o Docker Compose
  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

  # 5. (Opcional, mas recomendado) Adiciona seu usuário ao grupo 'docker' 
  # para executar comandos docker sem 'sudo'.
  sudo usermod -aG docker $USER

  # 6. (Importante) Faça logout e login novamente para que a alteração do grupo tenha efeito.
  
  # 7. Verifique a instalação
  docker --version
  docker compose version
  ```
- [ ] **[TASK-008]** **Containerizar API:** Criar um `Dockerfile` para a `DriverHub.API`.
- [ ] **[TASK-009]** **Containerizar Dashboard:** Criar um `Dockerfile` para o `DriverHub.Dashboard`.
- [ ] **[TASK-010]** **Orquestrar Serviços:** Criar um arquivo `docker-compose.yml` na raiz do projeto para gerenciar os contêineres da API, do Dashboard e do banco de dados PostgreSQL.
- [ ] **[TASK-011]** **Configurar Proxy Reverso:** Instalar e configurar um proxy reverso (como Nginx) na VM para direcionar o tráfego para os contêineres corretos e gerenciar os domínios/subdomínios.
- [ ] **[TASK-012]** **Automatizar Deploy (CI/CD):** Criar um workflow do GitHub Actions (`.github/workflows/deploy.yml`) que, a cada push na branch `main`:
    - Realiza o build das imagens Docker.
    - Envia as imagens para um registro (Docker Hub ou GitHub Container Registry).
    - Acessa a VM via SSH para baixar e reiniciar os serviços com as novas imagens (`docker-compose pull && docker-compose up -d`).

---
*Use `[x]` para marcar uma tarefa como concluída.*