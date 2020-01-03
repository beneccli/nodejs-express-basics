const bodyParser = require('body-parser');

const expressLoader = async ({ app }) => {

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });

  app.use(require('morgan')('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));

  return app;
}

module.exports = expressLoader;
