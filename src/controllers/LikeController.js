class LikeController {
  constructor(likesModels, tokenManager) {
    this._likesModels = likesModels;
    this._tokenManager = tokenManager;

    this.postLikeMenu = this.postLikeMenu.bind(this);
    this.getLikeMenuByIdMenu = this.getLikeMenuByIdMenu.bind(this);
    this.deleteLikeMenuByIdMenu = this.deleteLikeMenuByIdMenu.bind(this);
  }

  async postLikeMenu(req, res) {
    const decodedToken = this._tokenManager.verifyAccessToken(
      req.cookies.accessToken
    );
    const { id_user } = decodedToken;
    const { id } = req.params;

    await this._likesModels.insertLikeMenu(id, id_user);

    return res.status(201).json({
      status: "success",
      message: "Success adding like to menu",
    });
  }

  async getLikeMenuByIdMenu(req, res) {
    const { id } = req.params;
    const likeCount = await this._likesModels.selectLikeMenuByIdMenu(id);

    return res.status(200).json({
      status: "success",
      data: {
        likeCount,
      },
    });
  }

  async deleteLikeMenuByIdMenu(req, res) {
    const { id } = req.params;
    await this._likesModels.deleteLikeMenu(id);

    return res.status(200).json({
      status: "success",
      message: "Like deleted",
    });
  }
}

export default LikeController;
