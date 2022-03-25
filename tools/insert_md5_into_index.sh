#!/bin/bash

bundle_file="./build/bundle.js"
template_index="./src/index-template.html"
out_index="./index.html"

md5=$(md5sum "$bundle_file" | cut -f 1 -d ' ')

if [ -z "$md5" ]; then
    echo "Failed to get md5"
    exit 1
fi


cat "$template_index" | sed -e "s/BUNDLE_MD5/$md5/g" > "$out_index"

echo "Updated $(basename "$out_index") with MD5 of $(basename "$bundle_file"): $md5"
