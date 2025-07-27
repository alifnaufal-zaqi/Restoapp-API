class AuthenticationController {
  constructor(userModel, authenticationModel, tokenManager, validator) {
    this._userModel = userModel;
    this._authenticationModel = authenticationModel;
    this._tokenManager = tokenManager;
    this._validator = validator;
  }

  async postAuthenticationHandler(req, res) {
    this._validator.validatePostAuthenticationPayload(req.body);

    const { email, password } = req.body;
    const user = await this._userModel.verifyUserCredential({
      email,
      password,
    });

    const accessToken = this._tokenManager.generateAccessToken(user);
    const refreshToken = this._tokenManager.generateRefreshToken(user);

    await this._authenticationModel.insertRefreshToken(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: "success",
      message: "Login success",
    });
  }

  async putAuthenticationHandler(req, res) {
    this._validator.validatePutAuthenticationPayload(req.cookies.refreshToken);

    const { refreshToken } = req.cookies;
    await this._authenticationModel.verifyRefreshToken(refreshToken);
    const user = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Access token updated successfully",
    });
  }

  async deleteAuthenticationHandler(req, res) {
    this._validator.validateDeleteAuthenticationPayload(
      req.cookies.refreshToken
    );

    const { refreshToken } = req.cookies;
    await this._authenticationModel.verifyRefreshToken(refreshToken);
    await this._authenticationModel.deleteRefreshToken(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({
      status: "success",
      message: "Refresh token deleted successsfully",
    });
  }
}

export default AuthenticationController;
