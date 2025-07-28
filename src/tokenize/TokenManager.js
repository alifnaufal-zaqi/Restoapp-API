import jwt from "jsonwebtoken";
import InvariantError from "../exceptions/InvariantError.js";

export const TokenManager = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "15m",
    });
  },
  generateRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: "7d",
    });
  },
  verifyRefreshToken: (refreshToken) => {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      return decoded;
    } catch (err) {
      throw new InvariantError("Invalid Refresh Token");
    }
  },
  verifyAccessToken: (accessToken) => {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      return decoded;
    } catch (err) {
      throw new InvariantError("Invalid Refresh Token");
    }
  },
};
