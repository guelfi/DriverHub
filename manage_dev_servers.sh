#!/bin/bash

start_servers() {
    echo "Iniciando a API DriverHub em segundo plano..."
    (cd src/DriverHub.API && dotnet run > /dev/null 2>&1 &)
    API_PID=$!
    echo "API DriverHub iniciada com PID: $API_PID"

    echo "Iniciando o aplicativo móvel DriverHub em segundo plano..."
    (cd src/DriverHub.MobileApp && npm start > /dev/null 2>&1 &)
    MOBILE_APP_PID=$!
    echo "Aplicativo móvel DriverHub iniciado com PID: $MOBILE_APP_PID"

    echo ""
    echo "Aguardando alguns segundos para os serviços inicializarem..."
    sleep 10 # Dá um tempo para os serviços subirem

    status_servers
}

stop_servers() {
    echo "Parando os serviços DriverHub (API e Aplicativo Móvel)..."
    killall dotnet > /dev/null 2>&1
    killall node > /dev/null 2>&1

    echo "Serviços parados. Verificando se há processos remanescentes..."
    sleep 2 # Dá um tempo para os processos encerrarem
    lsof -i -P -n | grep LISTEN | grep -E 'dotnet|node'

    if [ $? -eq 0 ]; then
        echo "Atenção: Alguns processos podem não ter sido encerrados. Verifique manualmente."
    else
        echo "Todos os serviços DriverHub foram encerrados com sucesso."
    fi
}

status_servers() {
    echo ""
    echo "Verificando o status dos serviços..."
    echo "---------------------------------------------------"

    # Verifica a API
    API_STATUS=$(lsof -i -P -n | grep LISTEN | grep DriverHub | awk '{print $9}' | cut -d':' -f2 | head -n 1)
    if [ -n "$API_STATUS" ]; then
        echo "API DriverHub: Rodando na porta $API_STATUS"
    else
        echo "API DriverHub: Não está rodando ou porta não detectada."
    fi

    # Verifica o Aplicativo Móvel
    MOBILE_STATUS=$(lsof -i -P -n | grep LISTEN | grep 8081 | awk '{print $9}' | cut -d':' -f2 | head -n 1)
    if [ -n "$MOBILE_STATUS" ]; then
        echo "Aplicativo Móvel DriverHub: Rodando na porta $MOBILE_STATUS"
    else
        echo "Aplicativo Móvel DriverHub: Não está rodando ou porta não detectada."
    fi

    echo ""
    echo "Obtendo o endereço IP do seu notebook..."
    LOCAL_IP=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -n 1)
    echo "Endereço IP do seu notebook: $LOCAL_IP"

    echo ""
    echo "Para testes no celular (conectado à mesma rede Wi-Fi):"
    echo "Acesse no navegador do celular: http://$LOCAL_IP:${MOBILE_STATUS:-8081}"
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
