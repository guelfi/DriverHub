#!/bin/bash

# Script para criar o primeiro usuário administrador

API_URL="http://localhost:5217/api/Auth/register-admin"

# Verifica se os argumentos foram fornecidos
if [ "$#" -ne 4 ]; then
    echo "Uso: $0 <email> <senha> <nome> <sobrenome>"
    exit 1
fi

EMAIL=$1
PASSWORD=$2
NOME=$3
SOBRENOME=$4

echo "Tentando registrar o primeiro usuário administrador..."

RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\", \"nome\": \"$NOME\", \"sobrenome\": \"$SOBRENOME\"}" $API_URL)

if echo "$RESPONSE" | grep -q "Usuário registrado com sucesso."; then
    echo "Usuário administrador '$EMAIL' registrado com sucesso!"
elif echo "$RESPONSE" | grep -q "Já existe um usuário administrador."; then
    echo "Erro: Já existe um usuário administrador. Não é permitido criar mais de um administrador via este script."
    echo "Resposta da API: $RESPONSE"
else
    echo "Erro ao registrar o usuário administrador."
    echo "Resposta da API: $RESPONSE"
fi
