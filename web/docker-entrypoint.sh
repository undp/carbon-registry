#!/bin/sh
#!/bin/sh
# vim:sw=4:ts=4:et

set -e

if [ -z "${NGINX_ENTRYPOINT_QUIET_LOGS:-}" ]; then
    exec 3>&1
else
    exec 3>/dev/null
fi

if [ "$1" = "nginx" -o "$1" = "nginx-debug" ]; then
    if /usr/bin/find "/docker-entrypoint.d/" -mindepth 1 -maxdepth 1 -type f -print -quit 2>/dev/null | read v; then
        echo >&3 "$0: /docker-entrypoint.d/ is not empty, will attempt to perform configuration"

        echo >&3 "$0: Looking for shell scripts in /docker-entrypoint.d/"
        find "/docker-entrypoint.d/" -follow -type f -print | sort -n | while read -r f; do
            case "$f" in
                *.sh)
                    if [ -x "$f" ]; then
                        echo >&3 "$0: Launching $f";
                        "$f"
                    else
                        # warn on shell scripts without exec bit
                        echo >&3 "$0: Ignoring $f, not executable";
                    fi
                    ;;
                *) echo >&3 "$0: Ignoring $f";;
            esac
        done

        echo >&3 "$0: Configuration complete; ready for start up"
    else
        echo >&3 "$0: No files found in /docker-entrypoint.d/, skipping configuration"
    fi
fi

REACT_APP_BACKEND=$(env | grep REACT_APP_BACKEND= | cut -d'=' -f2-)
REACT_APP_STAT_URL=$(env | grep REACT_APP_STAT_URL= | cut -d'=' -f2-)
echo "REACT_APP_BACKEND value: $REACT_APP_BACKEND"
echo "REACT_APP_STAT_URL value: $REACT_APP_STAT_URL"

if [ -n "$REACT_APP_BACKEND" ]; then
  sed -i "s|http://localhost:3000|$REACT_APP_BACKEND|g" /usr/share/nginx/html/static/js/*.js
else
  echo "REACT_APP_BACKEND environment variable not found."
fi

if [ -n "$REACT_APP_STAT_URL" ]; then
  sed -i "s|http://localhost:3100|$REACT_APP_STAT_URL|g" /usr/share/nginx/html/static/js/*.js
else
  echo "REACT_APP_STAT_URL environment variable not found."
fi

echo "Enviroment Variable Injection Complete."


exec "$@"