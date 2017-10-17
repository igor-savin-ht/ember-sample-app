const app = require('./app');
const config = require('./src/config/config');
const PORT = config.get('SERVICE_PORT');
const logger = require('./src/helpers/logging.helper').mainLogger;

app.listen(PORT, () => {
	logger.info(`App listening on port ${PORT}`);
});
