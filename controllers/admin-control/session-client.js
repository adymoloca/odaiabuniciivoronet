import Client from '../../models/client.js';

const sessionClient = async (req, res, next) => {

  const {
    clientID
  } = req.body;
  
  let existingClient;

  try {

    existingClient = await Client.findOne({
        clientID: clientID
    });

    if (!existingClient)
      return res.status(401).json({
        message: 'No account found .'
      });
  } catch (error) {
    return res.json({
      error
    });
  };

  res.json({
    message: 'Welcome back!',
    client: existingClient
  });
};

export default sessionClient;