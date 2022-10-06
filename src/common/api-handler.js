class ApiHandler {
    constructor(logger) {
        this.log = logger;
        this.handleError = this.handleError.bind(this);
        this.buildSortBy = this.buildSortBy.bind(this);
    }

    handleError(err, res) {
        this.log.error(err.message, [err]);
        res.status(500);
        res.json(err);
    }

    buildSortBy(sort, direction) {
        let sortBy = {};
        if (sort) {
            sortBy[sort] = direction === 'asc' ? 1 : -1;
        }

        return sortBy;
    }
}

module.exports = ApiHandler;
