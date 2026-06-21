# NOPLP

## How to populate database
python3 csv_to_sql.py "./utf-8-NOPLP.csv" output.sql
psql -U matteo -d noplp_db -f ./scripts/output.sql