#!/usr/bin/env bash
# Publica a versao estatica do lojaoficial2 em uma pasta exclusiva,
# sem modificar os outros sites da VPS nem habilitar pagamentos.
set -euo pipefail

REPO_URL="https://github.com/lorddos2029-debug/lojaoficial2.git"
SRC_DIR="${HOME}/lojaoficial2"
SITE_DIR="/var/www/pichauofertas.com"
NGINX_SITE="/etc/nginx/sites-available/pichauofertas.com"
NGINX_LINK="/etc/nginx/sites-enabled/pichauofertas.com"

if [[ "${EUID}" -eq 0 ]]; then
  echo "Execute como usuario ubuntu (sem sudo na frente do bash)."
  exit 1
fi

for tool in git rsync nginx; do
  if ! command -v "${tool}" >/dev/null 2>&1; then
    echo "Dependencia ausente: ${tool}. Instale antes de continuar."
    exit 1
  fi
done

if [[ -e "${SRC_DIR}" && ! -d "${SRC_DIR}/.git" ]]; then
  echo "Ja existe ${SRC_DIR} sem repositorio Git; nao vou sobrescreve-lo."
  exit 1
fi

if [[ -d "${SRC_DIR}/.git" ]]; then
  echo "Atualizando codigo..."
  git -C "${SRC_DIR}" fetch origin main
  git -C "${SRC_DIR}" merge --ff-only origin/main
else
  echo "Clonando codigo..."
  git clone --branch main "${REPO_URL}" "${SRC_DIR}"
fi

[[ -f "${SRC_DIR}/index.html" ]] || { echo "index.html nao encontrado"; exit 1; }

# Pasta separada: nunca remove arquivos das outras hospedagens.
sudo install -d -m 755 "${SITE_DIR}"
sudo rsync -a --delete \
  --exclude='/.git/' \
  --exclude='/.github/' \
  --exclude='/deploy/' \
  --exclude='/server/' \
  --exclude='/node_modules/' \
  --exclude='/package.json' \
  --exclude='/package-lock.json' \
  --exclude='/README.md' \
  "${SRC_DIR}/" "${SITE_DIR}/"

# Se ja existir um virtual host, preserva-o para nao sobrescrever SSL/config.
if [[ ! -e "${NGINX_SITE}" ]]; then
  sudo tee "${NGINX_SITE}" >/dev/null <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name pichauofertas.com www.pichauofertas.com;

    root /var/www/pichauofertas.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
    location ~ /\\.(?!well-known) {
        deny all;
    }
    add_header X-Content-Type-Options "nosniff" always;
}
NGINX
else
  echo "Nginx ja possui configuracao para este dominio; preservada."
fi

if [[ ! -e "${NGINX_LINK}" ]]; then
  sudo ln -s "${NGINX_SITE}" "${NGINX_LINK}"
fi

sudo nginx -t
sudo systemctl reload nginx

echo "Deploy estatico concluido. Teste local:"
curl -I --max-time 8 -H "Host: pichauofertas.com" "http://127.0.0.1/" || true
echo "Confira o DNS do dominio antes de executar:"
echo "sudo certbot --nginx -d pichauofertas.com -d www.pichauofertas.com"
