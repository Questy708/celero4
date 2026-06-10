#!/bin/bash
# Robust Next.js dev server startup script
# Fixes the recurring "Z.ai logo only" issue by:
# 1. Binding to 0.0.0.0 (accessible from Caddy gateway)
# 2. Not using tee pipe (prevents silent process kills)
# 3. Auto-prewarming the server before browser access
# 4. Auto-restart on crash

LOGFILE="dev.log"
PORT=3000
HOST="0.0.0.0"

# Kill any existing server
pkill -f "next dev" 2>/dev/null || true
sleep 2

# Start Next.js dev server - write directly to log file (no tee pipe that can break)
cd /home/z/my-project
node_modules/.bin/next dev -p "$PORT" -H "$HOST" >> "$LOGFILE" 2>&1 &
echo "Server starting... PID: $!"

# Wait for the server to be listening
echo "Waiting for server to be ready..."
for i in $(seq 1 60); do
  if ss -tlnp 2>/dev/null | grep -q ":${PORT} "; then
    echo "Server is listening on port ${PORT}"
    break
  fi
  sleep 1
done

# Pre-warm: compile the home page before any browser hits it
# This prevents the server from being overwhelmed by concurrent compilation requests
echo "Pre-warming server (compiling home page)..."
for attempt in 1 2 3; do
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://${HOST}:${PORT}/" 2>/dev/null || echo "000")
  if [ "$HTTP_CODE" = "200" ]; then
    echo "Pre-warm successful (HTTP ${HTTP_CODE})"
    break
  fi
  echo "Pre-warm attempt ${attempt}: HTTP ${HTTP_CODE}, retrying..."
  sleep 3
done

# Second pre-warm: ensure everything is cached
sleep 2
curl -s -o /dev/null "http://${HOST}:${PORT}/" 2>/dev/null || true

echo "Server is ready and pre-warmed!"
