require('dotenv').config()

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL || `postgresql://postgres:${process.env.POSTGRES_PASSWORD}@postgres-project-svc:5432/postgres`,
}