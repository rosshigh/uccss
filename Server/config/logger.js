 var winston = require('winston')
	 fs = require('fs');

var env = process.env.NODE_ENV || 'development';

var logDir = 'log';

	var tsFormat = () => (new Date()).toLocaleTimeString();
	// Create the log directory if it does not exist
	if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
	}

	var  logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			colorize: true,
			// level: env === 'development' ? 'verbose' : 'info'
			level: 'verbose'
		}),
		new (require('winston-daily-rotate-file'))({
			name: 'logFile',
			filename: `${logDir}/-results.log`,
			prepend: true,
			level: env === 'development' ? 'verbose' : 'info'
		})
	]
	});

	log = function(message, level){
		level = level || 'info';
		logger.log(level, message);
	}

	logError = function(message){		
		var msg = message.code + "@@" + message.message.split(":").join('%').replace(',','') + "@@" + message.err.split(":").join('%').replace(',','') + "@@" + message.ip.split(":").join('%');		
		logger.log('error',msg);
	}

	exports.log = log;
	exports.logError = logError;