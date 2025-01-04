run command
docker compose -f "docker-compose.yml" up -d --build

### ENV Examples

```
NODE_ENV=development

API_PORT=3000
INTERNAL_API_PORT=3000
API_COMMAND=start:dev

UI_PORT=4200
UI_COMMAND=start
UI_URL=http://localhost:4200

DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=DB_USERNAME
DB_PASSWORD=DB_PASSWORD
DB_DATABASE_NAME=task_manager
```
