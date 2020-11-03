let { ResponseError, fixProperties } = require('./responses')

let classes = {
    BadRequestClientError: class BadRequestClientError extends ResponseError {
        constructor(error, req) {
            super(error, req);
            fixProperties(this);
            this.statusCode = 400;
        }
    },
    NotFoundClientError: class NotFoundClientError extends ResponseError {
        constructor(error, req) {
            super(error, req);
            fixProperties(this);
            this.statusCode = 404;
        }
    },
    RemoteAPIServerError: class RemoteAPIServerError extends ResponseError {
        constructor(error, req) {
            super(error, req);
            fixProperties(this);
            this.statusCode = 503;
        }
    },
    UnAuthorizedClientError: class UnAuthorizedClientError extends ResponseError {
        constructor(error, req) {
            super(error, req);
            fixProperties(this);
            this.statusCode = 401;
        }
    },
}
module.exports = {
    ...classes, ResponseError
};
