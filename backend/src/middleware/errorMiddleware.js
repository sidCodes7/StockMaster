export const errorMiddleware = (err, req, res, next) => {
  console.error("❌ Error:", err);

  const status = err.statusCode || 500;

  return res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
