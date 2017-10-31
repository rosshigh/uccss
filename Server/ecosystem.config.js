module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'uccss',
      script    : 'index.js',
      log_date_format : "YYYY-MM-DD HH:mm Z",
      date_format: "YYYY-MM-DD HH:mm Z",
      error_file : "c:/uccss/pm2Log/err.log",
      out_file : "c:/uccss/pm2Log/out.log",
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'development'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ]
};
