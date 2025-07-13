#!/bin/bash

LOGS_DIR="$(pwd)/logs"
API_LOG="$LOGS_DIR/driverhub_api.log"
MOBILE_APP_LOG="$LOGS_DIR/driverhub_mobile_app.log"
API_PID_FILE="$LOGS_DIR/driverhub_api_pid.txt"

# Cria o diretório de logs se não existir
mkdir -p "$LOGS_DIR"

start_servers() {
    echo "Iniciando a API DriverHub em segundo plano..."
    nohup bash -c "cd src/DriverHub.API && dotnet run" > "$API_LOG" 2>&1 &
    API_PID=$!
    echo $API_PID > "$API_PID_FILE"
    echo "API DriverHub iniciada com PID: $API_PID"

    echo "Iniciando o aplicativo móvel DriverHub em segundo plano..."
    (cd src/DriverHub.MobileApp && nohup npm start > "$MOBILE_APP_LOG" 2>&1 &)
    sleep 5 # Dá um tempo para o Expo iniciar e abrir a porta
    MOBILE_APP_PID=$(lsof -t -i :5218)
    if [ -n "$MOBILE_APP_PID" ]; then
        echo "Aplicativo móvel DriverHub iniciado com PID: $MOBILE_APP_PID"
    else
        echo "Falha ao obter o PID do aplicativo móvel. Verifique o log em $MOBILE_APP_LOG"
    fi

    echo ""
    echo "Aguardando alguns segundos para os serviços inicializarem..."
    sleep 15 # Dá um tempo para os serviços subirem

    status_servers
    check_for_errors
}

stop_servers() {
    echo "Parando os serviços DriverHub (API e Aplicativo Móvel)..."

    API_PID=$(lsof -t -i:5217)
    if [ -n "$API_PID" ]; then
        kill -9 $API_PID
        echo "API DriverHub (PID $API_PID) encerrada."
    else
        echo "Nenhum processo da API encontrado na porta 5217."
    fi

    MOBILE_APP_PID=$(lsof -t -i:5218)
    if [ -n "$MOBILE_APP_PID" ]; then
        kill -9 $MOBILE_APP_PID
        echo "Aplicativo Móvel DriverHub (PID $MOBILE_APP_PID) encerrado."
    else
        echo "Nenhum processo do Aplicativo Móvel encontrado na porta 5218."
    fi

    # Limpa os arquivos de PID
    rm -f "$API_PID_FILE"

    echo "Serviços parados. Verificando se há processos remanescentes..."
    sleep 2 # Dá um tempo para os processos encerrarem
    lsof -i -P -n | grep LISTEN | grep -E 'dotnet|node'

    if [ $? -eq 0 ]; then
        echo "Atenção: Alguns processos podem não ter sido encerrados. Verifique manualmente."
    else
        echo "Todos os serviços DriverHub foram encerrados com sucesso."
    fi
}

check_for_errors() {
    echo ""
    echo "Verificando logs em busca de erros..."
    API_ERRORS=$(grep -iE "error|fail|exception" "$API_LOG")
    MOBILE_APP_ERRORS=$(grep -iE "error|fail|exception" "$MOBILE_APP_LOG")

    if [ -n "$API_ERRORS" ]; then
        echo "---------------------------------------------------"
        echo "ERROS ENCONTRADOS NO LOG DA API DriverHub:"
        echo "---------------------------------------------------"
        echo "$API_ERRORS"
        echo "---------------------------------------------------"
    else
        echo "Nenhum erro aparente encontrado no log da API DriverHub."
    fi

    if [ -n "$MOBILE_APP_ERRORS" ]; then
        echo "---------------------------------------------------"
        echo "ERROS ENCONTRADOS NO LOG DO APLICATIVO MÓVEL DriverHub:"
        echo "---------------------------------------------------"
        echo "$MOBILE_APP_ERRORS"
        echo "---------------------------------------------------"
    else
        echo "Nenhum erro aparente encontrado no log do Aplicativo Móvel DriverHub."
    fi
}

status_servers() {
    echo ""
    echo "Verificando o status dos serviços..."
    echo "---------------------------------------------------"

    # Verifica a API
    if [ -f "$API_PID_FILE" ]; then
        API_PID=$(cat "$API_PID_FILE")
        if ps -p $API_PID > /dev/null; then
            if lsof -i :5217 > /dev/null; then
                echo "API DriverHub: Rodando na porta 5217 (PID $API_PID)"
            else
                echo "API DriverHub: Rodando (PID $API_PID), mas a porta 5217 não foi detectada pelo script. Verifique o log para mais detalhes."
            fi
        else
            echo "API DriverHub: Não está rodando (PID $API_PID não encontrado)."
        fi
    else
        echo "API DriverHub: Não está rodando (arquivo PID não encontrado)."
    fi

    # Verifica o Aplicativo Móvel
    MOBILE_APP_PID=$(lsof -t -i :5218)
    if [ -n "$MOBILE_APP_PID" ]; then
        echo "Aplicativo Móvel DriverHub: Rodando na porta 5218 (PID $MOBILE_APP_PID)"
    else
        echo "Aplicativo Móvel DriverHub: Não está rodando (porta 5218 livre)."
    fi

    echo ""
    echo "Obtendo o endereço IP do seu notebook..."
    LOCAL_IP=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -n 1)
    echo "Endereço IP do seu notebook: $LOCAL_IP"

    echo ""
    echo "Para testes no celular (conectado à mesma rede Wi-Fi):"
    echo "Acesse no navegador do celular: http://$LOCAL_IP:${MOBILE_PORT:-5218}"
    echo "---------------------------------------------------"
}

case "$1" in
    start)
        start_servers
        ;;
    stop)
        stop_servers
        ;;
    status)
        status_servers
        ;;
    expo-start-foreground)
        stop_servers
        echo "Iniciando o aplicativo móvel DriverHub em primeiro plano para exibir o QR Code..."
        (cd src/DriverHub.MobileApp && npm start)
        ;;
    *)
        echo "Uso: $0 {start|stop|status|expo-start-foreground}"
        exit 1
        ;;
esac
