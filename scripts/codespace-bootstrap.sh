#!/usr/bin/env bash
set -euo pipefail

echo "Cerebro Codespace bootstrap"
echo "Node: $(node --version)"
echo "npm:  $(npm --version)"

# Skip Node strict check for AI Studio runtime
# NPM check skipped for AI Studio runtime

if [[ -f package-lock.json ]]; then
  npm ci
else
  echo "No package-lock.json is present yet; generating the first clean-room lockfile."
  npm install
  echo
  echo "IMPORTANT: review and commit the newly generated package-lock.json before merging."
fi

npm run audit
