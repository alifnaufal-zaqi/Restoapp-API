class OrderItemController {
  constructor(orderItemModel, restaurantModel, tokenManager) {
    this._orderItemModel = orderItemModel;
    this._restaurantModel = restaurantModel;
    this._tokenManager = tokenManager;

    this.getOrderItemByIdRestaurant =
      this.getOrderItemByIdRestaurant.bind(this);
  }

  async getOrderItemByIdRestaurant(req, res) {
    const decodedToken = this._tokenManager.verifyAccessToken(
      req.cookies.accessToken
    );
    const { id_user } = decodedToken;
    const idRestaurant = await this._restaurantModel.selectRestaurantByIdUser(
      id_user
    );

    const orderItems =
      await this._orderItemModel.selectOrderItemsByIdRestaurant(idRestaurant);

    return res.status(200).json({
      status: "success",
      data: {
        orderItems,
      },
    });
  }
}

export default OrderItemController;
