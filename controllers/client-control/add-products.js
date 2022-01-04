import Client from '../../models/client.js';

const addProducts = async (req, res, next) => {
  const userID = req.params.uid;
  const {
    base64,
    label,
    type,
    dim,
    price,
    numberOfItems
  } = req.body;

  let existingClient;

  let newItem = [{base64: 'data:image/png;base64,'+base64, label: label, type: type, dim: dim, price: price, numberOfItems: numberOfItems}];

  try {
    existingClient = await Client.findOne({clientID: userID});
    if(existingClient) {
      existingClient.editedPhotos = [...existingClient.editedPhotos,...newItem]
    }

    await existingClient.save();
    
  } catch (error) {
      return res.status(500).json({
        error
      });
  };

  res.status(200).json({
    message: 'Product added',
    editedPhotos: await existingClient.editedPhotos,
  });
};

export default addProducts;