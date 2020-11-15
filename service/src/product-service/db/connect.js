'use strict';
import { Client } from 'pg';

export const createClient = async () => {
  const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
  const dbOptions = {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USERNAME,
      password: PG_PASSWORD,
      ssl: {
          rejectUnauthorized: false // to avoid warring in this example
      },
      connectionTimeoutMillis: 5000 // time in millisecond for termination of the database query
  };

  const client = new Client(dbOptions);
  await client.connect();

  return client
};
