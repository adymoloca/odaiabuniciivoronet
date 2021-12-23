import Client from '../../models/client.js';
import Order from '../../models/order.js';

const newOrder = async (req, res, next) => {
    const userID = req.params.uid;
    const { order, contactDetails } = req.body;

    let existingClient;
    let newOrder;

try {
    existingClient = await Client.findOne({clientID: userID});
    
    if(existingClient) {
        newOrder = new Order({
            order: order,
            contactDetails: contactDetails,
            clientID: userID,
        })
    }

    await newOrder.save();

} catch (err) {
    res.status(500).json("Order failed!")
}

res.status(201).json({
    message: 'New order added!',
    order: newOrder,
});
};

export default newOrder;
