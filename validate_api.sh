#!/bin/bash

BASE_URL="http://localhost/driverhub-api/api"
ADMIN_EMAIL="guelfi@msn.com"
MOTORISTA_EMAIL="motora@driverhub.com"
PASSWORD="246588"
ADMIN_PASSWORD="admin123"

echo "=== Iniciando Validação da API DriverHub ==="

# 1. Login Admin
echo -n "Testando Login Admin... "
ADMIN_TOKEN=$(curl -s -X POST "$BASE_URL/auth/login-admin" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\", \"password\":\"$ADMIN_PASSWORD\"}" | grep -oP '"token":"\K[^"]+')

if [ -n "$ADMIN_TOKEN" ]; then
  echo "✅ OK"
else
  echo "❌ FALHOU"
fi

# 2. Login Motorista
echo -n "Testando Login Motorista... "
MOTO_TOKEN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$MOTORISTA_EMAIL\", \"password\":\"$PASSWORD\"}" | grep -oP '"token":"\K[^"]+')

if [ -n "$MOTO_TOKEN" ]; then
  echo "✅ OK"
else
  echo "❌ FALHOU"
fi

# 3. Profile Motorista
echo -n "Testando Get Profile Motorista... "
PROFILE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$BASE_URL/motorista/profile" \
  -H "Authorization: Bearer $MOTO_TOKEN")

if [ "$PROFILE_STATUS" == "200" ]; then
  echo "✅ OK"
else
  echo "❌ FALHOU (Status: $PROFILE_STATUS)"
fi

echo "=== Validação Concluída ==="
