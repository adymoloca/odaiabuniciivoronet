import Client from '../../models/client.js';

const deleteProduct = async (req, res, next) => {
    const clientID = req.params.clientID;

    const { productID } = req.body;

    let existingClient;
    let productToDelete;

    try{
        existingClient = await Client.findOne({clientID: clientID});
        productToDelete = await existingClient.editedPhotos.findById(productID);
    } catch {
        return res.status(500).json("Deleting product failed !");
    }

    try {
        await productToDelete.remove();
    } catch (error) {
        return res.status(500).json("Deleting product failed !", error);
    }

    res.json({
        message: 'Product deleted !',
        cart: await existingClient.editedPhotos,
    })
}

export default deleteProduct;