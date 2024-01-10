class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); //constructor of parent cllasinf passing to it
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
