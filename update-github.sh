#!/bin/bash

# Este script automatiza os comandos git add, git commit e git push.
# Ele recebe a mensagem de commit como um argumento.

# 1. Verificar se a mensagem de commit foi fornecida
if [ -z "$1" ]; then
    echo "Erro: Nenhuma mensagem de commit fornecida."
    echo "Uso: $0 \"Sua mensagem de commit\""
    exit 1
fi

commit_message=$1

echo "--- Atualizando GitHub ---"

# 2. Adicionar todas as mudanças para o stage
echo "Adicionando todas as mudanças..."
git add .
if [ $? -ne 0 ]; then
    echo "Erro ao adicionar mudanças. Verifique o status do Git."
    exit 1
fi
echo "Mudanças adicionadas com sucesso."

# 3. Criar o commit
echo "Criando commit com a mensagem: \"$commit_message\""
git commit -m "$commit_message"
if [ $? -ne 0 ]; then
    echo "Erro ao criar o commit. Verifique o status do Git (talvez não haja mudanças para commitar)."
    exit 1
fi
echo "Commit criado com sucesso."

# 4. Enviar as mudanças para o repositório remoto (branch 'main')
echo "Enviando mudanças para o GitHub..."
git push origin main
if [ $? -ne 0 ]; then
    echo "Erro ao enviar mudanças para o GitHub. Verifique sua conexão ou credenciais."
    exit 1
fi
echo "GitHub atualizado com sucesso!"

echo "--- Fim da Atualização ---"