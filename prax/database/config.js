let config

if (process.env.NODE_ENV === 'production'){
    config = {
        db: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST
    }
}else{
    config = {
        db: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.HOST
    }
}

module.exports = config