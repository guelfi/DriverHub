# 🚚 DRIVERHUB - Sistema de Gestão de Motoristas

**Stack:** .NET 8 API + React (Frontend) + React (Dashboard)  
**Branch:** `main`  
**Banco:** PostgreSQL (driverhub_prod)  
**Repo:** https://github.com/guelfi/DriverHub.git

## 📋 CONFIGURAÇÃO

| Componente | Porta | URL Local | URL Produção |
|------------|-------|-----------|--------------|
| API | 6006 | http://localhost:6006 | /driverhub-api/ |
| Frontend | 6000 | http://localhost/driverhub/ | /driverhub/ |
| Dashboard | 6001 | http://localhost/driverhub-admin/ | /driverhub-admin/ |

## 🗄️ BANCO DE DADOS

**PostgreSQL Dev:**
- Database: `driverhub_dev`
- User: `driverhub_user`
- Password: `dev123`

**PostgreSQL Prod:**
- Database: `driverhub_prod`
- User: `batuara`
- Password: `batuara123`

**Credenciais Produção:**
- `admin@driverhub.com` / `246588`
- `guelfi@msn.com` / `246588`

## 🚀 DEPLOY

```bash
cd /mnt/c/Users/SP-MGUELFI/Projetos
./deploy-oci.sh  # Opção 3
```

## 📝 MIGRAÇÃO PENDENTE

- [ ] docker-compose.local.yml (PostgreSQL)
- [ ] docker-compose.production.yml
- [ ] deploy.sh
- [ ] dev.sh
- [ ] .env.example
- [ ] README-DEPLOY.md
- [ ] .github/workflows/deploy-oci.yml

## 🔗 LINKS

- API: http://129.153.86.168/driverhub-api/swagger
- Frontend: http://129.153.86.168/driverhub/
- Admin: http://129.153.86.168/driverhub-admin/
- Docs Central: /Projetos/PROMPT_MESTRE.md
