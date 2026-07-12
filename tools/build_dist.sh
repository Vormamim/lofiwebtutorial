#!/usr/bin/env bash
# Assemble a clean, deployable copy of the site in ./dist
#
# This is a no-build static site, so "dist" simply gathers the runtime files
# and leaves out everything a visitor doesn't need (source syllabus documents,
# generator scripts, this script). Re-run any time:  bash tools/build_dist.sh
set -euo pipefail

# repo root = parent of this script's directory
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$ROOT/dist"

echo "Building dist/ from $ROOT"
rm -rf "$DIST"
mkdir -p "$DIST"

# Runtime assets to ship (paths relative to repo root)
ITEMS=(
  "index.html"
  "ide.html"
  "progress.html"
  "exam.html"
  "css"
  "js"
  ".nojekyll"
  "README.md"
)

for item in "${ITEMS[@]}"; do
  if [ -e "$ROOT/$item" ]; then
    cp -R "$ROOT/$item" "$DIST/"
    echo "  + $item"
  else
    echo "  ! missing (skipped): $item"
  fi
done

# Ensure GitHub Pages serves vendored/data files untouched even if .nojekyll
# was absent above.
touch "$DIST/.nojekyll"

echo
echo "dist/ built:"
( cd "$DIST" && find . -type f | sort | sed 's/^/    /' )
BYTES=$(du -sh "$DIST" | cut -f1)
echo
echo "Total size: $BYTES"
echo "Preview:  python3 -m http.server 8000 --directory dist  ->  http://localhost:8000"
