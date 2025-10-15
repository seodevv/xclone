#!/bin/sh
# docker-entrypoint.sh
envsubst '${DOMAIN_NAME}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/xclone.conf
dos2unix /etc/nginx/conf.d/xclone.conf
[ -f "/etc/nginx/conf.d/default.conf" ] && rm /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
