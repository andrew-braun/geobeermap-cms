module.exports = ({ env }) => ({
    connection: {
      client: 'postgres',
      connection: {
        host: env('PGHOST', '127.0.0.1'),
        port: env.int('PGPORT', env('DATABASE_PORT', 5432)),
        database: env('PGDATABASE', env('PGDATABASE')),
        user: env('PGUSER', env('PGUSER')),
        password: env('PGPASSWORD', env('PGPASSWORD')),
        ssl: env.bool(true),
      },
    },
  });