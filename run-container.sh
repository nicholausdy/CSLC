#!/usr/bin/bash
sudo docker run -p 3000:3000 -d --env-file ../.env -e TZ=Asia/Jakarta nekoconnoisseur/cslc-be:2.0 
