#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:---plan}"

: "${SERVICE:?Nome del servizio mancante}"
: "${INSTALL_HOOK:?Script di installazione mancante}"
: "${CHECK_HOOK:?Script di verifica mancante}"

for script in "$INSTALL_HOOK" "$CHECK_HOOK"; do
    if [[ ! -x "$script" ]]; then
        echo "Script non eseguibile: $script" >&2
        exit 2
    fi
done

case "$MODE" in
    --plan)
        echo "Servizio: $SERVICE"
        echo "Installazione: $INSTALL_HOOK"
        echo "Verifica: $CHECK_HOOK"
        echo "Nessuna modifica eseguita."
        ;;
    --apply)
        "$INSTALL_HOOK"
        "$CHECK_HOOK"
        ;;
    *)
        echo "Uso: $0 --plan|--apply" >&2
        exit 2
        ;;
esac
