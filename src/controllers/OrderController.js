class OrderController {
  constructor(orderModel, orderItemsModel, validator) {
    this._orderModel = orderModel;
    this._orderItemsModel = orderItemsModel;
    this._validator = validator;
  }

  async postNewOrder(req, res) {
    this._validator.validate(req.body);
    const { idUser, idPaymentMethod, items } = req.body;
    const orderDate = new Date().toISOString();

    const menuItems = items.map((item) => ({
      ...item,
      subtotal: item.price * item.quantity,
    }));

    const totalAmount = menuItems.reduce((acc, item) => acc + item.subtotal, 0);

    const idOrder = await this._orderModel.insertNewOrder({
      idUser,
      orderDate,
      totalAmount,
      idPaymentMethod,
    });

    for (let item of menuItems) {
      await this._orderItemsModel.insertOrderItem({
        idOrder,
        idMenu: item.idMenu,
        idRestaurant: item.idRestaurant,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        note: item.note,
      });
    }

    return res.status(201).json({
      status: "success",
      data: {
        idOrder,
      },
    });
  }
}
