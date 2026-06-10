#!/bin/bash
cd /home/z/my-project

# Kill any existing Next.js processes
pkill -f "next dev" 2>/dev/null || true
sleep 2

# Start the server
node_modules/.bin/next dev -p 3000 -H 0.0.0.0 > dev.log 2>&1 &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to start..."
for i in $(seq 1 30); do
  if ss -tlnp | grep -q ":3000 "; then
    echo "Server is listening on port 3000"
    break
  fi
  sleep 1
done

# Pre-warm the server by requesting the home page
echo "Pre-warming server..."
curl -s -o /dev/null http://0.0.0.0:3000/ 2>/dev/null || true
sleep 2

echo "Server PID: $SERVER_PID"
echo "Server is ready!"
