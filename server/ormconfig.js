// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [path.join(__dirname, 'src/**/*.entity{.ts,.js}')],
  seeds: [path.join(__dirname, '/src/config/database/seeds/**/*{.ts,.js}')],
  factories: [
    path.join(__dirname, 'src/config/database/factories/**/*{.ts,.js}'),
  ],
};
