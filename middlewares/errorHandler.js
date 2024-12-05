function logErrors(err, req, res, next) {
  next(err); // al enviarle el err entiende que es un middleware de error
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
  });
}

module.exports = { logErrors, errorHandler };
