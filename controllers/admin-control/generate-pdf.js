import PDFDocument from 'pdfkit';
import fs from 'fs';
import pdf2base64 from 'pdf-to-base64';
import Client from '../../models/client.js';

const generatePDF = async (req, res, next) => {

const {clientID, editedPhotos} = req.body;

const matrita = new PDFDocument({
    size: [850, 1190],
    margins : {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
});

matrita.pipe(fs.createWriteStream('matrita.pdf'));

let existingClient;
let docBase64;
let preparedArray;

try {
    existingClient = await Client.findOne({cliendID: clientID});
    preparedArray = editedPhotos.map(item => {
        console.log(item);
    });

    matrita.image('image.png', {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
      });

    matrita.end();

    // console.log('here', preparedArray)

pdf2base64("matrita.pdf")
    .then(res => {
        docBase64 = res;
    })
    .catch(err => {
        console.log(err);
    });

} catch(error) {
    console.log("Eroare", error);
    return res.json({
        error
    });
};

res.json({
    message: "Prima matrita este plina",
    matrita: docBase64,
})
};

export default generatePDF;
