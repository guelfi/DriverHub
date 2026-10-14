# DriverHub na OCI

O site público usa https://driverhub.guelfi.com.br/ e a API na mesma origem em /api. O dashboard permanece em /driverhub-admin/ e pertence ao projeto Compose `www`; o workflow atualiza apenas esse serviço usando um arquivo com um único serviço. Os demais projetos e o Nginx central não são recriados.

O Compose padrão e o local mantêm o base path /driverhub/. A produção acrescenta docker-compose.domain.yml para compilar o frontend em /. O dashboard preserva seu base path /driverhub-admin/ e a API legada /driverhub-api/api, disponível também no subdomínio.

O deploy automático exige CI aprovado em um push de main, fixa o commit aprovado e recusa um commit ultrapassado. O acionamento manual exige YES e CI aprovado para o mesmo commit. Antes de recriar serviços, valida projeto/volume PostgreSQL e rede do proxy, salva dump validado, configuração privada dos containers, ambiente existente e tags das imagens anteriores em /var/backups/driverhub. Não recria PostgreSQL, não altera credenciais e não executa down/remove-volumes/prune.

A validação pública exige HTML, todos os assets compilados das duas interfaces e JSON OpenAPI verdadeiro. A prova não inclui operações de escrita ou cadastro de usuários. O dashboard é deliberadamente básico: este ajuste torna a atualização operacional, sem ampliar funcionalidades do projeto.
