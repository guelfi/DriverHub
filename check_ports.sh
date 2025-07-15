#!/bin/bash

# Script para verificar se as portas 5217 (API) e 5218 (Mobile App) estão em uso.

PORT_API=5217
PORT_MOBILE=5218

echo "Verificando porta ${PORT_API} (API DriverHub)..."
if lsof -i :${PORT_API} >/dev/null;
then
    echo "Porta ${PORT_API} está em uso."
    lsof -i :${PORT_API}
else
    echo "Porta ${PORT_API} está livre."
fi

echo "
Verificando porta ${PORT_MOBILE} (Aplicativo Móvel DriverHub)..."
if lsof -i :${PORT_MOBILE} >/dev/null;
then
    echo "Porta ${PORT_MOBILE} está em uso."
    lsof -i :${PORT_MOBILE}
else
    echo "Porta ${PORT_MOBILE} está livre."
fi

