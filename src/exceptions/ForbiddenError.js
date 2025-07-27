import ClientError from "./ClientError.js";

class ForbiddenError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = "ForbiddenError";
  }
}

export default ForbiddenError;
