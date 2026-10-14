#!/usr/bin/env bash
set -euo pipefail
revision=${1:?Exact validated commit required}
[[ $revision =~ ^[a-f0-9]{40}$ ]] || exit 2
cd /var/www/DriverHub
git fetch origin main
git cat-file -e "$revision^{commit}"
[[ $(git rev-parse origin/main) == "$revision" ]] || { echo 'A newer main exists; rerun its validated deployment.'; exit 1; }
[[ $(sudo -n docker inspect postgres-driverhub --format '{{index .Config.Labels "com.docker.compose.project"}}') == driverhub ]]
[[ $(sudo -n docker inspect driverhub-dashboard --format '{{index .Config.Labels "com.docker.compose.project"}}') == www ]]
[[ $(sudo -n docker inspect postgres-driverhub --format '{{range .Mounts}}{{if eq .Destination "/var/lib/postgresql/data"}}{{.Name}}{{end}}{{end}}') == driverhub_postgres-driverhub-data ]]
sudo -n docker network inspect www_projetos-net >/dev/null
sudo -n docker inspect nginx-proxy --format '{{json .NetworkSettings.Networks}}' | python3 -c 'import json,sys; assert "driverhub_driverhub-net" in json.load(sys.stdin)'
backup=/var/backups/driverhub/deploy-$(date -u +%Y%m%dT%H%M%SZ)
sudo -n install -d -m 700 "$backup"
git rev-parse HEAD | sudo -n tee "$backup/previous-commit" >/dev/null
if [[ -f .env ]]; then sudo -n cp -p .env "$backup/environment.env"; fi
for container in driverhub-api driverhub-frontend driverhub-dashboard postgres-driverhub; do
  sudo -n docker inspect "$container" | sudo -n tee "$backup/$container.json" >/dev/null
  image=$(sudo -n docker inspect "$container" --format '{{.Image}}')
  sudo -n docker tag "$image" "$container:before-${backup##*/}"
done
sudo -n docker exec postgres-driverhub sh -c 'exec pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' | sudo -n tee "$backup/database.dump" >/dev/null
sudo -n cat "$backup/database.dump" | sudo -n docker exec -i postgres-driverhub pg_restore --list >/dev/null
sudo -n chmod 600 "$backup"/*
git checkout --detach "$revision"
sudo -n docker compose -p driverhub -f docker-compose.yml -f docker-compose.domain.yml up -d --build --no-deps driverhub-api driverhub-frontend
# Dashboard remains part of www; this file has exactly one service and never recreates the proxy.
sudo -n docker compose -p www -f docker-compose.dashboard-oci.yml up -d --build --no-deps driverhub-dashboard
python3 deploy/smoke-domain.py
printf 'DriverHub deployed at %s; rollback snapshot: %s\n' "$revision" "$backup"
