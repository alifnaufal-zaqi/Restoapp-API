import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
    req.user = decode;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Forbidden",
    });
  }
};

export default verifyToken;
