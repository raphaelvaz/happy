module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "migrations": [
        // "./dist/src/database/migrations/*.js"
        "./src/database/migrations/*.ts"
    ],
    "entities": [
        // "./dist/src/database/migrations/*.js"
        "./src/models/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}