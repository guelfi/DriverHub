#!/bin/bash

API_LOG="/tmp/driverhub_api.log"
MOBILE_APP_LOG="/tmp/driverhub_mobile_app.log"

start_servers() {
    echo "Iniciando a API DriverHub em segundo plano..."
    nohup bash -c "cd src/DriverHub.API && dotnet run" > "$API_LOG" 2>&1 &
    API_PID=$!
    echo $API_PID > /tmp/driverhub_api_pid.txt
    echo "API DriverHub iniciada com PID: $API_PID"

    echo "Iniciando o aplicativo móvel DriverHub em segundo plano..."
    nohup bash -c "cd src/DriverHub.MobileApp && npm start" > "$MOBILE_APP_LOG" 2>&1 &
    MOBILE_APP_PID=$!
    echo $MOBILE_APP_PID > /tmp/driverhub_mobile_pid.txt
    echo "Aplicativo móvel DriverHub iniciado com PID: $MOBILE_APP_PID"

    echo ""
    echo "Aguardando alguns segundos para os serviços inicializarem..."
    sleep 10 # Dá um tempo para os serviços subirem

    status_servers
    check_for_errors
}

stop_servers() {
    echo "Parando os serviços DriverHub (API e Aplicativo Móvel)..."

    if [ -f /tmp/driverhub_api_pid.txt ]; then
        API_PID=$(cat /tmp/driverhub_api_pid.txt)
        if ps -p $API_PID > /dev/null; then
            kill $API_PID
            echo "API DriverHub (PID $API_PID) encerrada."
        else
            echo "API DriverHub não está rodando ou PID inválido."
        fi
        rm /tmp/driverhub_api_pid.txt
    else
        echo "Arquivo PID da API não encontrado."
    fi

    if [ -f /tmp/driverhub_mobile_pid.txt ]; then
        MOBILE_APP_PID=$(cat /tmp/driverhub_mobile_pid.txt)
        if ps -p $MOBILE_APP_PID > /dev/null; then
            kill $MOBILE_APP_PID
            echo "Aplicativo Móvel DriverHub (PID $MOBILE_APP_PID) encerrado."
        else
            echo "Aplicativo Móvel DriverHub não está rodando ou PID inválido."
        fi
        rm /tmp/driverhub_mobile_pid.txt
    else
        echo "Arquivo PID do Aplicativo Móvel não encontrado."
    fi

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
    if [ -f /tmp/driverhub_api_pid.txt ]; then
        API_PID=$(cat /tmp/driverhub_api_pid.txt)
        if ps -p $API_PID > /dev/null; then
            API_PORT=$(lsof -i -P -n -p $API_PID | grep LISTEN | awk '{print $9}' | cut -d':' -f2 | head -n 1)
            if [ -n "$API_PORT" ]; then
                echo "API DriverHub: Rodando na porta $API_PORT (PID $API_PID)"
            else
                echo "API DriverHub: Rodando (PID $API_PID), mas porta não detectada."
            fi
        else
            echo "API DriverHub: Não está rodando (PID $API_PID não encontrado)."
        fi
    else
        echo "API DriverHub: Não está rodando (arquivo PID não encontrado)."
    fi

    # Verifica o Aplicativo Móvel
    if [ -f /tmp/driverhub_mobile_pid.txt ]; then
        MOBILE_APP_PID=$(cat /tmp/driverhub_mobile_pid.txt)
        if ps -p $MOBILE_APP_PID > /dev/null; then
            # Verifica se a porta 8081 está em uso pelo processo do aplicativo móvel
            MOBILE_PORT=$(lsof -i -P -n -p $MOBILE_APP_PID | grep LISTEN | grep 8081 | awk '{print $9}' | cut -d':' -f2 | head -n 1)
            if [ -n "$MOBILE_PORT" ]; then
                echo "Aplicativo Móvel DriverHub: Rodando na porta $MOBILE_PORT (PID $MOBILE_APP_PID)"
            else
                echo "Aplicativo Móvel DriverHub: Rodando (PID $MOBILE_APP_PID), mas porta 8081 não detectada diretamente. Verificando se a porta está em uso por outro processo..."
                MOBILE_PORT_GLOBAL=$(lsof -i -P -n | grep LISTEN | grep 8081 | awk '{print $9}' | cut -d':' -f2 | head -n 1)
                if [ -n "$MOBILE_PORT_GLOBAL" ]; then
                    echo "Aplicativo Móvel DriverHub: Porta $MOBILE_PORT_GLOBAL em uso (provavelmente pelo aplicativo móvel)."
                else
                    echo "Aplicativo Móvel DriverHub: Rodando (PID $MOBILE_APP_PID), mas porta 8081 não está em uso."
                fi
            fi
        else
            echo "Aplicativo Móvel DriverHub: Não está rodando (PID $MOBILE_APP_PID não encontrado)."
        fi
    else
        echo "Aplicativo Móvel DriverHub: Não está rodando (arquivo PID não encontrado)."
    fi

    echo ""
    echo "Obtendo o endereço IP do seu notebook..."
    LOCAL_IP=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -n 1)
    echo "Endereço IP do seu notebook: $LOCAL_IP"

    echo ""
    echo "Para testes no celular (conectado à mesma rede Wi-Fi):"
    echo "Acesse no navegador do celular: http://$LOCAL_IP:${MOBILE_PORT:-8081}"
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
    *)
        echo "Uso: $0 {start|stop|status}"
        exit 1
        ;;
esac
