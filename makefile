SQL_DIR=src/db

build: db deps

db:
	mysql -uroot -e "source ${SQL_DIR}/schema.sql" && mysql -uroot -e "source ${SQL_DIR}/seed.sql"

deps:
	npm install 2>/dev/null