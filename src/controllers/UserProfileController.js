class UserProfileController {
  constructor(model, validator, tokenManager) {
    this._model = model;
    this._validator = validator;
    this._tokenManager = tokenManager;

    this.putUserProfileHandler = this.putUserProfileHandler.bind(this);
    this.getUserProfileByIdUserHandler =
      this.getUserProfileByIdUserHandler.bind(this);
  }

  async getUserProfileByIdUserHandler(req, res) {
    const decodedToken = this._tokenManager.verifyAccessToken(
      req.cookies.accessToken
    );
    const { id_user, role } = decodedToken;

    const userProfile = await this._model.selectUserProfileByIdUser(id_user);

    res.status(200).json({
      status: "success",
      data: {
        ...userProfile,
        role,
      },
    });
  }

  async putUserProfileHandler(req, res) {
    const { body, file } = req;

    this._validator.validate(body, file);

    const decodedToken = this._tokenManager.verifyAccessToken(
      req.cookies.accessToken
    );
    const { id_user } = decodedToken;

    const { address, noTelp, gender } = body;
    const profileImage = file ? `/assets/profiles/${file.filename}` : null;

    const newField = {
      ...(address && { address }),
      ...(noTelp && { noTelp }),
      ...(gender && { gender }),
      ...(profileImage && { photoProfile: profileImage }),
    };

    await this._model.updateUserProfileByIdUser(id_user, newField);

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
    });
  }
}

export default UserProfileController;
