#!/bin/sh

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Generating Prisma client..."
npx prisma generate

echo "Starting the backend application..."
exec npm run dev