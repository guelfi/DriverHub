#!/bin/bash

# --- Configurações ---
LOGS_DIR="$(pwd)/logs"
API_LOG="$LOGS_DIR/driverhub_api.log"
PWA_LOG="$LOGS_DIR/driverhub_pwa.log"

API_PID_FILE="$LOGS_DIR/driverhub_api_pid.txt"
PWA_PID_FILE="$LOGS_DIR/driverhub_pwa_pid.txt"

API_PORT=5217
PWA_PORT=3000

PWA_SERVICE_FILE="src/driverhub.frontendweb/src/services/AuthService.ts"

# --- Funções ---

# Garante que o diretório de logs exista
mkdir -p "$LOGS_DIR"

# Atualiza os IPs nos arquivos de configuração
update_ip_configs() {
    echo "Detectando o endereço IP da rede local..."
    LOCAL_IP=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -n 1)

    if [ -z "$LOCAL_IP" ]; then
        echo "ERRO: Não foi possível detectar o endereço IP local."
        exit 1
    fi

    echo "IP detectado: $LOCAL_IP. Atualizando arquivos de configuração..."

    if [ -f "$PWA_SERVICE_FILE" ]; then
        sed -i.bak "s#^const API_URL = .*#const API_URL = 'http://$LOCAL_IP:$API_PORT/api/auth'#" "$PWA_SERVICE_FILE"
        rm "${PWA_SERVICE_FILE}.bak"
        echo "-> Configuração do PWA atualizada."
    else
        echo "AVISO: Arquivo de configuração do PWA não encontrado: $PWA_SERVICE_FILE"
    fi
    echo ""
}

# Inicia os servidores
start_servers() {
    update_ip_configs

    echo "Iniciando a API DriverHub em segundo plano..."
    nohup bash -c "cd src/DriverHub.API && dotnet run" > "$API_LOG" 2>&1 &
    echo $! > "$API_PID_FILE"
    echo "API DriverHub iniciada com PID: $(cat $API_PID_FILE)"

    echo "Iniciando o PWA DriverHub em segundo plano..."
    nohup bash -c "cd src/driverhub.frontendweb && PORT=$PWA_PORT npm start" > "$PWA_LOG" 2>&1 &
    echo $! > "$PWA_PID_FILE"
    echo "PWA DriverHub iniciado com PID: $(cat $PWA_PID_FILE)"

    echo ""
    echo "Aguardando 15 segundos para os serviços inicializarem..."
    sleep 15

    status_servers
    check_for_errors
}

# Para os servidores
stop_servers() {
    echo "Parando os serviços DriverHub (API e PWA)..."

    # Para a API pela porta
    API_PID_PORT=$(lsof -t -i:$API_PORT)
    if [ -n "$API_PID_PORT" ]; then
        kill -9 $API_PID_PORT
        echo "API DriverHub (PID $API_PID_PORT) encerrada."
    else
        echo "Nenhum processo da API encontrado na porta $API_PORT."
    fi

    # Para o PWA pela porta
    PWA_PID_PORT=$(lsof -t -i:$PWA_PORT)
    if [ -n "$PWA_PID_PORT" ]; then
        kill -9 $PWA_PID_PORT
        echo "PWA DriverHub (PID $PWA_PID_PORT) encerrado."
    else
        echo "Nenhum processo do PWA encontrado na porta $PWA_PORT."
    fi

    # Limpa os arquivos de PID
    rm -f "$API_PID_FILE" "$PWA_PID_FILE"
    echo "Serviços parados."
}

# Verifica erros nos logs
check_for_errors() {
    echo ""
    echo "Verificando logs em busca de erros..."
    
    if [ -f "$API_LOG" ] && [ -n "$(grep -iE 'error|fail|exception' "$API_LOG")" ]; then
        echo "---------------------------------------------------"
        echo "ERROS ENCONTRADOS NO LOG DA API:"
        grep -iE 'error|fail|exception' "$API_LOG"
        echo "---------------------------------------------------"
    else
        echo "Nenhum erro aparente encontrado no log da API."
    fi

    if [ -f "$PWA_LOG" ] && [ -n "$(grep -iE 'error|fail|exception' "$PWA_LOG")" ]; then
        echo "---------------------------------------------------"
        echo "ERROS ENCONTRADOS NO LOG DO PWA:"
        grep -iE 'error|fail|exception' "$PWA_LOG"
        echo "---------------------------------------------------"
    else
        echo "Nenhum erro aparente encontrado no log do PWA."
    fi
}

# Verifica o status dos servidores
status_servers() {
    echo ""
    echo "--- Status dos Serviços DriverHub ---"
    
    # Verifica a API
    if lsof -t -i:$API_PORT > /dev/null; then
        echo "API DriverHub: Rodando (http://localhost:$API_PORT)"
    else
        echo "API DriverHub: Parada"
    fi

    # Verifica o PWA
    if lsof -t -i:$PWA_PORT > /dev/null; then
        echo "PWA DriverHub: Rodando (http://localhost:$PWA_PORT)"
    else
        echo "PWA DriverHub: Parado"
    fi

    echo "-------------------------------------"
}

# --- Lógica Principal ---
case "$1" in
    start)
        stop_servers
        echo ""
        start_servers
        ;;
    stop)
        stop_servers
        ;;
    status)
        status_servers
        ;;
    *)
        echo "Uso: $0 {start|stop|status}"
        exit 1
        ;;
esac
