#!/bin/bash

echo "=== Network Binding Verification ==="
echo "Checking all listening TCP ports..."
ss -tuln 2>/dev/null || netstat -tuln 2>/dev/null

echo -e "\n=== Checking Port 3000 (Required by Infrastructure) ==="
curl -s -m 2 http://0.0.0.0:3000/api/diagnostic > /dev/null
if [ $? -eq 0 ]; then
  echo "✅ Port 3000 is correctly bound and accepting connections."
else
  echo "❌ Connection refused on port 3000."
fi

echo -e "\n=== Checking Port 3001 (Requested Check) ==="
curl -s -m 2 http://0.0.0.0:3001/api/diagnostic > /dev/null
if [ $? -eq 0 ]; then
  echo "✅ Port 3001 is accepting connections."
else
  echo "❌ Connection refused on port 3001. Service is not listening here."
fi
