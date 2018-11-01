var winston = require('winston');
require('winston-daily-rotate-file');;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new (winston.transports.DailyRotateFile)({
        level: 'error',
        filename: 'log/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      }),
      new (winston.transports.DailyRotateFile)({
        filename: 'log/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
    ]
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.simple()
      )
    }));
  }

module.exports = logger;

//  var winston = require('winston')
// 	 fs = require('fs');

// var env = process.env.NODE_ENV || 'development';

// var logDir = 'log';

// 	var tsFormat = () => (new Date()).toLocaleTimeString();
// 	// Create the log directory if it does not exist
// 	if (!fs.existsSync(logDir)) {
// 	fs.mkdirSync(logDir);
// 	}

// 	var  logger = new (winston.Logger)({
// 	transports: [
// 		new (winston.transports.Console)({
// 			colorize: true,
// 			level: env === 'development' ? 'verbose' : 'info',
// 			level: 'verbose'
// 		}),
// 		new (require('winston-daily-rotate-file'))({
// 			name: 'logFile',
// 			filename: `${logDir}/-results.log`,
// 			prepend: true,
// 			level: env === 'development' ? 'verbose' : 'info'
// 		})
// 	]
// 	});

// 	log = function(message, level){
// 		level = level || 'info';
// 		logger.log(level, message);
// 	}

// 	logError = function(message){		
// 		var msg = message.code + "@@" + message.message.split(":").join('%').replace(',','') + "@@" + message.err.split(":").join('%').replace(',','') + "@@" + message.ip.split(":").join('%');		
// 		logger.log('error',msg);
// 	}

// 	exports.log = log;
// 	exports.logError = logError;