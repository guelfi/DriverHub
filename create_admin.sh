#!/bin/bash

# Script para criar ou listar usuários administradores

# Verifica se o primeiro argumento é 'list-admins'
if [ "$1" == "list-admins" ]; then
    echo "Tentando listar os usuários administradores..."
    dotnet run --project src/DriverHub.AdminTool -- list-admins
else
    # Verifica se todos os argumentos necessários para criar um admin foram passados
    if [ "$#" -ne 4 ]; then
        echo "Uso para criar admin: $0 <email> <senha> <nome> <sobrenome>"
        echo "Uso para listar admins: $0 list-admins"
        exit 1
    fi
    
    EMAIL=$1
    PASSWORD=$2
    NOME=$3
    SOBRENOME=$4

    echo "Tentando registrar o usuário administrador..."
    dotnet run --project src/DriverHub.AdminTool -- "$EMAIL" "$PASSWORD" "$NOME" "$SOBRENOME"
fi

echo "Verifique os logs da ferramenta de administração para o resultado da operação."
