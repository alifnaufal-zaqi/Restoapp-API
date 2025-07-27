import bcrypt from "bcryptjs";

class UserController {
  constructor(model, validator) {
    this._model = model;
    this._validator = validator;

    this.postNewUserHandler = this.postNewUserHandler.bind(this);
  }

  async postNewUserHandler(role) {
    return async (req, res) => {
      this._validator.validate(req.body);
      const { email, username, password } = req.body;

      await this._model.verifyNewEmail(email);

      const hashedPassword = bcrypt.hash(password, 10);
      const idUser = await this._model.insertNewUser({
        email,
        username,
        hashedPassword,
        role,
      });

      return res.status(201).json({
        status: "success",
        data: {
          idUser,
        },
      });
    };
  }
}

export default UserController;
