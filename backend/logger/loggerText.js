const spacer = '----------'

const LOGGINT_TEXT = {

    INFO: {

        API_CALLED: spacer + 'API CALLED :: ',

        DB_CONNECTION: spacer + 'DB :: CONNECTED',
        DB_SEND_QUERY: spacer + 'DB :: QUERY SENT',
        API_SUCCESS: spacer + 'DATA SETNT TO FRONTEND'

    },

    ERROR: {
        ERROR_SATRT: spacer + 'ERORR OCCURRED :: ',
        DB_ERROR: spacer + 'DB :: ERROR'
    },

    WARNING: {
        WARNING_NO_DATA: spacer + 'WARNING :: ',
    }

}

module.exports = LOGGINT_TEXT