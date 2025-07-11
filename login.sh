#!/bin/bash
curl -v -X POST http://localhost:5217/api/Auth/login \
-H "Content-Type: application/json" \
--data-binary "@login.json"
