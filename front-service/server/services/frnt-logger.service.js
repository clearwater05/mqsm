const { createLogger, format, transports } = require('winston');
const { combine, printf } = format;

const {
    LOGGING_PATH,
    LOGGING_FILE
} = require('../../front-service.config');

const mqsmLogsFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message} (${info.error || info.event})`;
});

const logger = createLogger({
    format: mqsmLogsFormat,
    transports: [
        new transports.File({ filename: `${__dirname}/../${LOGGING_PATH}/${LOGGING_FILE}` })
    ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
      format: combine(
          mqsmLogsFormat
      )
  }));
}


module.exports = {
    /**
     *
     * @param message
     * @param error
     * @param timestamp
     */
    errorLog(message, error, timestamp) {
        logger.log({
            level: 'error',
            timestamp,
            message,
            error
        });
    },

    /**
     *
     * @param message
     * @param event
     * @param timestamp
     */
    eventLog(message, event, timestamp) {
        logger.log({
            level: 'info',
            timestamp,
            message: message,
            event
        });
    }
};