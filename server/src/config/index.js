
const dbConfig = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.BD_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: "postgres"
    }
}

module.exports = dbConfig;
