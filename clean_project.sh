#!/bin/bash

echo "Iniciando a limpeza de arquivos padrão do template .NET..."

# Navega para a pasta src
cd src || { echo "Pasta src não encontrada. Saindo."; exit 1; }

# Remove Class1.cs em todas as subpastas
echo "Removendo Class1.cs..."
find . -name "Class1.cs" -type f -delete
echo "Class1.cs removidos."

# Remove Usings.cs e GlobalUsings.cs SE ESTIVEREM VAZIOS
echo "Removendo Usings.cs e GlobalUsings.cs vazios..."
find . -name "Usings.cs" -type f -size 0 -delete
find . -name "GlobalUsings.cs" -type f -size 0 -delete
echo "Usings.cs e GlobalUsings.cs vazios removidos."

# Volta para a raiz do projeto
cd ..

echo "Limpeza concluída. Por favor, verifique manualmente se outros arquivos como Program.cs ou Startup.cs (em camadas que não sejam a API) precisam ser removidos."
echo "Após a remoção, é recomendado rodar 'dotnet build' na raiz do projeto."