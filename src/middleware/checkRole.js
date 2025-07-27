import ForbiddenError from "../exceptions/ForbiddenError.js";

const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      throw new ForbiddenError("Forbidden");
    }
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};

const isVendor = (req, res, next) => {
  try {
    if (req.user && req.user.role === "vendor") {
      next();
    } else {
      throw new ForbiddenError("Forbidden");
    }
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};

export { isAdmin, isVendor };
