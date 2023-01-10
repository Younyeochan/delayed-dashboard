module.exports = {
    apps: [ {
        name: 'Web',
        script: 'bin/www',
        watch: false,
        ignore_watch: [ 'logs' ],
        merge_logs: true,
        log_date_format: 'YY-MM-DD HH:mm:ss'
    } ]
}