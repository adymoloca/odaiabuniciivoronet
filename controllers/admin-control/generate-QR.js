import Client from '../../models/client.js';
import widgets from 'qrcode';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const upperCaseName = uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals],
    style: 'upperCase',
});

const capitalizedName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    style: 'capital',
});

const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
});

const { toString, toDataURL } = widgets;


const generateQR = async (req, res, next) => {

const dynamicData = Date.now();

let stringdata = JSON.stringify(dynamicData+upperCaseName+capitalizedName+randomName);

let generateQRCode;
let QRCode;

try {
    generateQRCode = new Client({
        clientID: dynamicData,
        sessionPhotos: [],
        editedPhotos: [],
        QRcodeString: toString(stringdata,{type:'terminal'},(QRcode) => QRcode),
    })

    toDataURL(stringdata,(err, QRcode) => QRCode = QRcode)

    await generateQRCode.save();

} catch (err) {
    res.status(500).json("Registration has failed!")
}

res.status(201).json({
    message: 'New user added!',
    user: generateQRCode,
    QRCode: QRCode,
});
};

export default generateQR;
