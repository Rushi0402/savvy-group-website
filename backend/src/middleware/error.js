const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (res.headersSent) return next(error);

  const status = error.code === "P2025" ? 404 : error.status || 500;

  return res.status(status).json({
    success: false,
    message:
      status === 404
        ? "The requested record was not found."
        : "Something went wrong on the server.",
  });
};

module.exports = errorHandler;
