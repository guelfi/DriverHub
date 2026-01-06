#!/bin/bash

# --- Configuração ---
# Usando URLs via Nginx Local
API_URL="http://localhost/driverhub-api/api"
ADMIN_EMAIL="guelfi@msn.com"
ADMIN_SENHA='@5ST73EA4x'
ADMIN_SENHA_INCORRETA="SenhaErrada123"
MOTORISTA_EMAIL="motorista.teste.$(date +%s)@driverhub.com"
MOTORISTA_SENHA="Motorista@123"
MOTORISTA_SENHA_INCORRETA="SenhaErrada456"

# --- Funções de Utilidade ---

run_test() {
    local TEST_NAME="$1"
    local EXPECTED_STATUS="$2"
    shift 2
    # Agora passamos os argumentos restantes diretamente para o curl
    
    echo -e "\n--- TESTE: $TEST_NAME ---"

    # Executa o curl e captura o status code no final
    # Usamos -w para pegar o status code e redirects/outputs para corpo
    RESPONSE=$(curl -s -w "\n%{http_code}" "$@")
    HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')

    echo "Status Esperado: $EXPECTED_STATUS | Status Recebido: $HTTP_STATUS"
    echo "Corpo da Resposta: $BODY"

    if [ "$HTTP_STATUS" -eq "$EXPECTED_STATUS" ]; then
        echo ")-> SUCESSO"
        echo "$BODY"
    else
        echo ")-> FALHA"
        exit 1
    fi
}

# --- Execução dos Testes ---

# 1. Garantir que o admin existe
./create_admin.sh "$ADMIN_EMAIL" "$ADMIN_SENHA" "Admin" "User" > /dev/null
echo "Administrador garantido."

# 2. Login de Admin (Falha - Senha Incorreta)
run_test "Login de Admin (Falha - Senha Incorreta)" 401 \
    -X POST "$API_URL/Admin/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$ADMIN_EMAIL\", \"senha\": \"$ADMIN_SENHA_INCORRETA\"}"

# 3. Login de Admin (Sucesso)
ADMIN_LOGIN_RESPONSE=$(run_test "Login de Admin (Sucesso)" 200 \
    -X POST "$API_URL/Admin/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$ADMIN_EMAIL\", \"senha\": \"$ADMIN_SENHA\"}")

ADMIN_TOKEN=$(echo "$ADMIN_LOGIN_RESPONSE" | grep -oP '"token":"\K[^"]+')
if [ -z "$ADMIN_TOKEN" ]; then echo "FALHA: Token de admin não encontrado."; exit 1; fi

# 4. Registrar Motorista (Sucesso)
run_test "Registrar Motorista (Sucesso)" 200 \
    -X POST "$API_URL/Auth/register" \
    -H "Content-Type: application/json" \
    -d "{\"nome\": \"Motorista\", \"sobrenome\": \"Teste\", \"email\": \"$MOTORISTA_EMAIL\", \"senha\": \"$MOTORISTA_SENHA\"}"

# 5. Login de Motorista (Falha - Senha Incorreta)
run_test "Login de Motorista (Falha - Senha Incorreta)" 401 \
    -X POST "$API_URL/Auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$MOTORISTA_EMAIL\", \"senha\": \"$MOTORISTA_SENHA_INCORRETA\"}"

# 6. Login de Motorista (Sucesso)
MOTORISTA_LOGIN_RESPONSE=$(run_test "Login de Motorista (Sucesso)" 200 \
    -X POST "$API_URL/Auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$MOTORISTA_EMAIL\", \"senha\": \"$MOTORISTA_SENHA\"}")

MOTORISTA_TOKEN=$(echo "$MOTORISTA_LOGIN_RESPONSE" | grep -oP '"token":"\K[^"]+')
if [ -z "$MOTORISTA_TOKEN" ]; then echo "FALHA: Token de motorista não encontrado."; exit 1; fi

# 7. Obter Perfil do Motorista (Sucesso)
run_test "Obter Perfil do Motorista (Sucesso)" 200 \
    -X GET "$API_URL/Motorista/profile" \
    -H "Authorization: Bearer $MOTORISTA_TOKEN"

# 8. Obter Contagem de Motoristas (Sucesso - Admin Auth)
run_test "Obter Contagem de Motoristas (Sucesso)" 200 \
    -X GET "$API_URL/Admin/motorist-count" \
    -H "Authorization: Bearer $ADMIN_TOKEN"

# 9. Listar Motoristas (Sucesso - Admin Auth)
run_test "Listar Motoristas (Sucesso)" 200 \
    -X GET "$API_URL/Admin/motoristas?pageNumber=1&pageSize=5" \
    -H "Authorization: Bearer $ADMIN_TOKEN"

echo -e "\n--- TODOS OS TESTES FORAM CONCLUÍDOS COM SUCESSO! ---"