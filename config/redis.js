const redis = require('redis')
module.exports.connectRedis = () => {
    const client = redis.createClient({
        password: 'myarK8Dpe4UI1uqi1NwWKIh0UuW68d6D',
        socket: {
            host: 'redis-18066.c84.us-east-1-2.ec2.redns.redis-cloud.com',
            port: 18066
        }
    })
    client.on('error', err => console.log('Redis Client Error', err))
    client.connect();
    return client;
}

