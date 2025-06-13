#!/bin/bash

echo " Setting up Hotel Management DB....."

# Create database
psql -U postgres -h localhost -c "CREATE DATABASE notedb;"

# Run migrations 
psql -U postgres -h localhost -d notedb -f src/database/migration/schema.sql

# CREATE stored Procedures
psql -U postgres -h localhost -d notedb -f src/database/Procedures/create_note.sql
psql -U postgres -h localhost -d notedb -f src/database/Procedures/get_note.sql
psql -U postgres -h localhost -d notedb -f src/database/Procedures/update_note.sql
psql -U postgres -h localhost -d notedb -f src/database/Procedures/delete_note.sql



echo "DATABASE setup complete..."

echo " You can now run : npm run start:dev"