module.exports = function(context) {
  return {
    // Postgres
    pgHost: process.env.POSTGRES_HOST || 'hagnytgaidastjornunogprofanir_my_postgres_container_1',
    pgUser: process.env.POSTGRES_USER || 'default_user',
    pgPassword: process.env.POSTGRES_PASSWORD || 'default_password',
    pgDatabase: process.env.POSTGRES_DB || 'default_database',

    // Port
    port: process.env.PORT || 4000,
  };
};
