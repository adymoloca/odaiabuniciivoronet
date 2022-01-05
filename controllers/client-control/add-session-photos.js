import Client from '../../models/client.js';

const addSessionPhotos = async (req, res, next) => {
  const userID = req.params.uid;
  const {
    sessionPhotos
  } = req.body;

  let existingClient;
  
  try {
    existingClient = await Client.findOne({clientID: userID});
    
    if(existingClient) {
      existingClient.sessionPhotos = [...existingClient.sessionPhotos, ...sessionPhotos];
    }

    await existingClient.save();

  } catch (error) {
    return res.status(500).json({
      error
    });
  };

  res.status(200).json({
    message: 'Photos added',
    sessionPhotos: await existingClient.sessionPhotos,
  });
};

export default addSessionPhotos;