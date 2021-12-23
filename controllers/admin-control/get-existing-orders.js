import Order from '../../models/order.js';

const existingOrder = async (req, res, next) => {
  const userID = req.params.uid;
  
  let existingOrderByClient;

  try {
    existingOrderByClient = await Order.findOne({clientID: userID});
    if(!existingOrderByClient) {
        return res.json({
            message: "No client found!",
        })
    }
  } catch (error) {
    return res.status(500).json({
      error
    });
  };

  res.status(200).json({
    message: 'Client found',
    order: existingOrderByClient,
  });
};

export default existingOrder;