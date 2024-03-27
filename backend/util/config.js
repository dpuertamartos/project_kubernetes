require('dotenv').config()

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:1234@postgres-project-svc:5432/postgres',
}