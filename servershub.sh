#!/bin/bash

# --- Configurações ---
LOGS_DIR="$(pwd)/logs"
API_LOG="$LOGS_DIR/driverhub_api.log"
FRONTENDWEB_LOG="$LOGS_DIR/driverhub_frontendweb.log"
DASHBOARD_LOG="$LOGS_DIR/driverhub_dashboard.log"

API_PID_FILE="$LOGS_DIR/driverhub_api_pid.txt"
FRONTENDWEB_PID_FILE="$LOGS_DIR/driverhub_frontendweb_pid.txt"
DASHBOARD_PID_FILE="$LOGS_DIR/driverhub_dashboard_pid.txt"

API_PORT=5217
DASHBOARD_PORT=5218
FRONTENDWEB_PORT=5220

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

    #if [ -f "$PWA_SERVICE_FILE" ]; then
    #    sed -i.bak "s#^const API_URL = .*#const API_URL = 'http://$LOCAL_IP:$API_PORT/api/auth'#" "$PWA_SERVICE_FILE"
    #    rm "${PWA_SERVICE_FILE}.bak"
    #    echo "-> Configuração do PWA atualizada."
    #else
    #    echo "AVISO: Arquivo de configuração do PWA não encontrado: $PWA_SERVICE_FILE"
    #fi
    echo ""
}

# Inicia os servidores
start_servers() {
    update_ip_configs

    echo "Iniciando a API DriverHub em segundo plano..."
    nohup bash -c "cd src/DriverHub.API && dotnet run" > "$API_LOG" 2>&1 &
    echo $! > "$API_PID_FILE"
    echo "API DriverHub iniciada com PID: $(cat $API_PID_FILE)"

    echo "Iniciando o Dashboard DriverHub em segundo plano..."
    nohup bash -c "cd src/DriverHub.Dashboard && npm run dev -- --port $DASHBOARD_PORT" > "$DASHBOARD_LOG" 2>&1 &
    echo $! > "$DASHBOARD_PID_FILE"
    echo "Dashboard DriverHub iniciado com PID: $(cat $DASHBOARD_PID_FILE)"

    echo "Iniciando o FrontendWeb DriverHub em segundo plano..."
    nohup bash -c "cd src/DriverHub.FrontendWeb && npm run dev -- --port $FRONTENDWEB_PORT" > "$FRONTENDWEB_LOG" 2>&1 &
    echo $! > "$FRONTENDWEB_PID_FILE"
    echo "FrontendWeb DriverHub iniciado com PID: $(cat $FRONTENDWEB_PID_FILE)"

    echo ""
    echo "Aguardando 30 segundos para os serviços inicializarem..."
    sleep 30

    status_servers
    check_for_errors
}

# Para os servidores
stop_servers() {
    echo "Parando os serviços DriverHub (API, PWA e Dashboard)..."

    # Para a API pela porta
    API_PID_PORT=$(lsof -t -i:$API_PORT)
    if [ -n "$API_PID_PORT" ]; then
        kill -9 $API_PID_PORT
        echo "API DriverHub (PID $API_PID_PORT) encerrada."
    else
        echo "Nenhum processo da API encontrado na porta $API_PORT."
    fi

    # Para o Dashboard pela porta
    DASHBOARD_PID_PORT=$(lsof -t -i:$DASHBOARD_PORT)
    if [ -n "$DASHBOARD_PID_PORT" ]; then
        kill -9 $DASHBOARD_PID_PORT
        echo "Dashboard DriverHub (PID $DASHBOARD_PID_PORT) encerrado."
    else
        echo "Nenhum processo do Dashboard encontrado na porta $DASHBOARD_PORT."
    fi

    # Para o FrontendWeb pela porta
    FRONTENDWEB_PID_PORT=$(lsof -t -i:$FRONTENDWEB_PORT)
    if [ -n "$FRONTENDWEB_PID_PORT" ]; then
        kill -9 $FRONTENDWEB_PID_PORT
        echo "FrontendWeb DriverHub (PID $FRONTENDWEB_PID_PORT) encerrado."
    else
        echo "Nenhum processo do FrontendWeb encontrado na porta $FRONTENDWEB_PORT."
    fi

    # Limpa os arquivos de PID
    rm -f "$API_PID_FILE" "$DASHBOARD_PID_FILE" "$FRONTENDWEB_PID_FILE"
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

    #if [ -f "$PWA_LOG" ] && [ -n "$(grep -iE 'error|fail|exception' "$PWA_LOG")" ]; then
    #    echo "---------------------------------------------------"
    #    echo "ERROS ENCONTRADOS NO LOG DO PWA:"
    #    grep -iE 'error|fail|exception' "$PWA_LOG"
    #    echo "---------------------------------------------------"
    #else
    #    echo "Nenhum erro aparente encontrado no log do PWA."
    #fi

    if [ -f "$DASHBOARD_LOG" ] && [ -n "$(grep -iE 'error|fail|exception' "$DASHBOARD_LOG")" ]; then
        echo "---------------------------------------------------"
        echo "ERROS ENCONTRADOS NO LOG DO DASHBOARD:"
        grep -iE 'error|fail|exception' "$DASHBOARD_LOG"
        echo "---------------------------------------------------"
    else
        echo "Nenhum erro aparente encontrado no log do Dashboard."
    fi

    if [ -f "$FRONTENDWEB_LOG" ] && [ -n "$(grep -iE 'error|fail|exception' "$FRONTENDWEB_LOG")" ]; then
        echo "---------------------------------------------------"
        echo "ERROS ENCONTRADOS NO LOG DO FrontendWeb:"
        grep -iE 'error|fail|exception' "$FRONTENDWEB_LOG"
        echo "---------------------------------------------------"
    else
        echo "Nenhum erro aparente encontrado no log do FrontendWeb."
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

    # Verifica o Dashboard
    if lsof -t -i:$DASHBOARD_PORT > /dev/null; then
        echo "Dashboard DriverHub: Rodando (http://localhost:$DASHBOARD_PORT)"
    else
        echo "Dashboard DriverHub: Parado"
    fi

    # Verifica o FrontendWeb
    if lsof -t -i:$FRONTENDWEB_PORT > /dev/null; then
        echo "FrontendWeb DriverHub: Rodando (http://localhost:$FRONTENDWEB_PORT)"
    else
        echo "FrontendWeb DriverHub: Parado"
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