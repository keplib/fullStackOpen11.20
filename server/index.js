const app = require('./app');
const config = require('./utils/config');

app.listen(config.PORT, () => {
  console.log(`app listening on port ${config.PORT}!`);
});
