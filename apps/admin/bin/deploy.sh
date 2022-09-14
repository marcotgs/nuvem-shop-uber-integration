#!/usr/bin/env bash

gcloud config set project nuvem-shop-uber-integration

gcloud functions deploy price-estimate \
  --gen2 \
  --allow-unauthenticated \
  --runtime=nodejs16 \
  --trigger-http \
  --source=./build \
  --entry-point=priceEstimate \
  --region=southamerica-east1 \
  --timeout=60s
