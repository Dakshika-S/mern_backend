// module.exports = (err, req, res, next) => {
//   // here the "err" is the object created in errorHnandler
//   err.statusCode = err.statusCode || 500;

//   if (process.env.NODE_ENV == "development") {
//     res.status(err.statusCode).json({
//       success: false,
//       message: err.message, // here the err message is a property which has given from parent class error ehich is available in node and value is  assigned in productController.js
//       stack: err.stack,
//       error: err,
//     });
//   }

//   if (process.env.NODE_ENV == "production") {
//     let message = err.message;
//     let error = { ...err };

//     if (err.name == "ValidationError") {
//       message = Object.values(err.errors).map((value) => value.message); //object.values used to get the values  form an object
//       error = new Error(message);
//     }

//     if (err.name == "CastError") {
//       message = `Resource not found ${err.path}`;
//       error = new Error(message);
//     }
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV == "development") {
    // console.log({ ...err });
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new Error(message);

    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      error = new Error(message);
      err.statusCode = 400;
    }
    // console.log(error);
    if (err.name == "CastError") {
      message = `Resource not found: ${err.path}`;
      error = new Error(message);
      err.statusCode = 400;
    }

    if (err.code == 11000) {
      let message = `Duplicate ${Object.keys(err.keyValue)} error`;
      error = new Error(message);
      err.statusCode = 400;
    }

    if (err.name == "JSONWebTokenError") {
      let message = `JSON Web Token is invalid. Try again`;
      error = new Error(message);
      err.statusCode = 400;
    }

    if (err.name == "TokenExpiredError") {
      let message = `JSON Web Token is expired. Try again`;
      error = new Error(message);
      err.statusCode = 400;
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "internal server error", // here the err message is a property which has given from parent class error ehich is available in node and value is  assigned in productController.js
      // message,
    });
  }
};
