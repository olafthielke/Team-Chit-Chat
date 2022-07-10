const config = require('../config');
const winston = require('winston');

const logger = winston.createLogger({
	level: config.get('logLevel') || 'info',
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		//winston.format.colorize(),
		winston.format.json()
	)
});

module.exports = logger;