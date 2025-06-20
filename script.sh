#!/bin/bash

echo " Setting up Hotel Management DB....."

# Create Database
psql -U postgres -h localhost -c "CREATE DATABASE notedb;"

# Run migrations 
psql -U postgres -h localhost -d notedb -f src/Database/migration/schema.sql

# CREATE stored Procedures
psql -U postgres -h localhost -d notedb -f src/Database/Procedures/create_note.sql
psql -U postgres -h localhost -d notedb -f src/Database/Procedures/get_note.sql
psql -U postgres -h localhost -d notedb -f src/Database/Procedures/update_note.sql
psql -U postgres -h localhost -d notedb -f src/Database/Procedures/delete_note.sql



echo "DATABASE setup complete..."

echo " You can now run : npm run start:dev"