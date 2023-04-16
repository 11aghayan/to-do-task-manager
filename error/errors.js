class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createError = (msg, statusCode) => {
  return new CustomError(msg, statusCode);
}

const notFound = (req, res) => {
  res.status(404).json({msg: `Not found`});
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({msg: err.message});
  }
  res.status(500).json({msg: 'Something went wrong, try again'});
};

module.exports = {
  notFound,
  createError,
  errorHandler
};