#!/bin/bash

# --- Configuração ---
API_URL="http://localhost:5217/api"
ADMIN_EMAIL="guelfi@msn.com"
ADMIN_SENHA='@5ST73EA4x'
ADMIN_SENHA_INCORRETA="SenhaErrada123"
MOTORISTA_EMAIL="motorista.teste.$(date +%s)@driverhub.com"
MOTORISTA_SENHA="Motorista@123"
MOTORISTA_SENHA_INCORRETA="SenhaErrada456"

# --- Funções de Utilidade ---

run_test() {
    TEST_NAME=$1
    EXPECTED_STATUS=$2
    shift 2
    CURL_ARGS=($@)

    echo -e "\n--- TESTE: $TEST_NAME ---"

    # Extrai a URL para o log
    URL=${CURL_ARGS[2]}

    # Executa o curl para obter o corpo e o código de status separadamente
    BODY=$(curl -s "${CURL_ARGS[@]}")
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${CURL_ARGS[@]}")

    echo "URL: $URL"
    echo "Status Esperado: $EXPECTED_STATUS | Status Recebido: $HTTP_STATUS"
    echo "Corpo da Resposta: $BODY"

    if [ "$HTTP_STATUS" -eq "$EXPECTED_STATUS" ]; then
        echo ")-> SUCESSO: O status code corresponde ao esperado."
        echo "$BODY"
    else
        echo ")-> FALHA: O status code é diferente do esperado."
        exit 1
    fi
}

# --- Execução dos Testes ---

# 1. Criar Administrador
./create_admin.sh "$ADMIN_EMAIL" "$ADMIN_SENHA" "Admin" "User"
echo "Administrador principal criado (ou já existente)."

# 2. Login de Admin (Falha - Senha Incorreta)
LOGIN_ADMIN_FALHA_PAYLOAD=$(cat <<EOF
{
    "email": "$ADMIN_EMAIL", "senha": "$ADMIN_SENHA_INCORRETA"
}
EOF
)
run_test "Login de Admin (Falha - Senha Incorreta)" 401 -X POST "$API_URL/Admin/login" -H "Content-Type: application/json" -d "$LOGIN_ADMIN_FALHA_PAYLOAD"

# 3. Login de Admin (Sucesso)
LOGIN_ADMIN_SUCESSO_PAYLOAD=$(cat <<EOF
{
    "email": "$ADMIN_EMAIL", "senha": "$ADMIN_SENHA"
}
EOF
)
ADMIN_LOGIN_RESPONSE=$(run_test "Login de Admin (Sucesso)" 200 -X POST "$API_URL/Admin/login" -H "Content-Type: application/json" -d "$LOGIN_ADMIN_SUCESSO_PAYLOAD")
ADMIN_TOKEN=$(echo "$ADMIN_LOGIN_RESPONSE" | grep -o '"token":"[^"']*' | cut -d '"' -f 4)
if [ -z "$ADMIN_TOKEN" ]; then echo "FALHA: Não foi possível extrair o token de admin."; exit 1; fi
echo "Token de Admin obtido com sucesso."

# 4. Registrar Motorista (Sucesso)
REGISTER_MOTORISTA_PAYLOAD=$(cat <<EOF
{
    "nome": "Motorista", "sobrenome": "Teste", "email": "$MOTORISTA_EMAIL", "senha": "$MOTORISTA_SENHA"
}
EOF
)
run_test "Registrar Motorista (Sucesso)" 200 -X POST "$API_URL/Auth/register" -H "Content-Type: application/json" -d "$REGISTER_MOTORISTA_PAYLOAD"

# 5. Login de Motorista (Falha - Senha Incorreta)
LOGIN_MOTORISTA_FALHA_PAYLOAD=$(cat <<EOF
{
    "email": "$MOTORISTA_EMAIL", "senha": "$MOTORISTA_SENHA_INCORRETA"
}
EOF
)
run_test "Login de Motorista (Falha - Senha Incorreta)" 401 -X POST "$API_URL/Auth/login" -H "Content-Type: application/json" -d "$LOGIN_MOTORISTA_FALHA_PAYLOAD"

# 6. Login de Motorista (Sucesso)
LOGIN_MOTORISTA_SUCESSO_PAYLOAD=$(cat <<EOF
{
    "email": "$MOTORISTA_EMAIL", "senha": "$MOTORISTA_SENHA"
}
EOF
)
MOTORISTA_LOGIN_RESPONSE=$(run_test "Login de Motorista (Sucesso)" 200 -X POST "$API_URL/Auth/login" -H "Content-Type: application/json" -d "$LOGIN_MOTORISTA_SUCESSO_PAYLOAD")
MOTORISTA_TOKEN=$(echo "$MOTORISTA_LOGIN_RESPONSE" | grep -o '"token":"[^"']*' | cut -d '"' -f 4)
if [ -z "$MOTORISTA_TOKEN" ]; then echo "FALHA: Não foi possível extrair o token de motorista."; exit 1; fi
echo "Token de Motorista obtido com sucesso."

# 7. Obter Perfil do Motorista (Sucesso)
run_test "Obter Perfil do Motorista (Sucesso)" 200 -X GET "$API_URL/Motorista/profile" -H "Authorization: Bearer $MOTORISTA_TOKEN"

# 8. Obter Contagem de Motoristas (Sucesso - Admin Auth)
run_test "Obter Contagem de Motoristas (Sucesso)" 200 -X GET "$API_URL/Admin/motorist-count" -H "Authorization: Bearer $ADMIN_TOKEN"

# 9. Listar Motoristas (Sucesso - Admin Auth)
run_test "Listar Motoristas (Sucesso)" 200 -X GET "$API_URL/Admin/motoristas?pageNumber=1&pageSize=5" -H "Authorization: Bearer $ADMIN_TOKEN"

echo -e "\n--- TODOS OS TESTES FORAM CONCLUÍDOS COM SUCESSO! ---"