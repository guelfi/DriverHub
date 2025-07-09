#!/bin/bash

# Este script automatiza os comandos git add, git commit e git push.
# Ele solicita uma mensagem de commit ao usuário.

echo "--- Atualizando GitHub ---"

# 1. Adicionar todas as mudanças para o stage
echo "Adicionando todas as mudanças..."
git add .
if [ $? -ne 0 ]; then
    echo "Erro ao adicionar mudanças. Verifique o status do Git."
    exit 1
fi
echo "Mudanças adicionadas com sucesso."

# 2. Solicitar a mensagem de commit
read -p "Digite a mensagem para o commit: " commit_message

# Verificar se a mensagem de commit não está vazia
if [ -z "$commit_message" ]; then
    echo "Mensagem de commit não pode ser vazia. Operação cancelada."
    exit 1
fi

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