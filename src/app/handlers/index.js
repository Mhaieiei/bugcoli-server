
const handlerError = (err,req, res, next) => {

  // treat as 404
  if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
    return next();
  }

  if (err.stack.includes('ValidationError')) {
    res.status(422).json({
      error: 422,
      description: err.stack.TypeError,
    });
    return false;
  }

  res.status(500).json({
    error: 500,
    // description: 'Internal Server Error'
    description: err.stack,
  });
  return false;

};

module.exports = handlerError;