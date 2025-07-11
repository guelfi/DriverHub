#!/bin/bash
curl -v -X POST http://localhost:5217/api/Auth/register \
-H "Content-Type: application/json" \
--data-binary "@register.json"
