#!/bin/bash

echo 'Waiting until pg is ready'
until pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -d $POSTGRES_DB -U $POSTGRES_USER; do sleep 2; done
echo 'Starting in dev mode'
npm run start:dev


