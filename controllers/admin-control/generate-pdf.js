import PDFDocument from 'pdfkit';
import fs from 'fs';
import pdf2base64 from 'pdf-to-base64';
import Client from '../../models/client.js';

// const templateMatrita1 = {landscape:[width = 30, height = 42], portrait: [width = 42, height = 30], dimenssions: [{w: 10, h:13}, {w: 14, h: 18}, {w:13, h:10}, {w: 18, h: 14}]};
// const templateMatrita2 = {landscape:[width = 60, height = 42], portrait: [width = 42, height = 60], dimenssions: [{w: 10, h:13}, {w: 14, h: 18}, {w:13, h:10}, {w: 18, h: 14}]};
// const templateMatrita3 = {landscape:[width = 30, height = 42], portrait: [width = 42, height = 30], dimenssions: [{w: 30, h:42}, {w: 42, h: 30}]};


// const splitDim = (dim) => {
//     const arr = dim.split('x');
//     const width = arr[0];
//     const height = arr[1];
//     return {width, height};
// }

// const compareArraysDim = (pdfDoc, template) => {
//     pdfDoc.size[width] = parseInt(pdfDoc.size[width]*0.352777778);
//     pdfDoc.size[height] = parseInt(pdfDoc.size[height]*0.352777778);
//     return Array.isArray(pdfDoc.size) && Array.isArray(template.landscape) && Array.isArray(template.portrait) && (pdfDoc.size.length == template.landscape.length || pdfDoc.size.length == template.portrait.length) && (pdfDoc.size.every((val, index) => val == template.landscape[index] || pdfDoc.size.every((val, index) => val == template.portrait[index])));
// }

// const getMin = ((dimenssions, index) => {
//     dimenssions.reduce((prev, curr) => {
//         prev[index] < curr[index] ? prev : curr;
//     });
// });

// const getMax = ((dimenssions, index) => {
//     dimenssions.reduce((prev, curr) => {
//         prev[index] > curr[index] ? prev : curr;
//     });
// });

// const isMatchingIntoPosition = (item, template, pdfDoc ) => {
//     let 
//     if(compareArraysDim(pdfDoc, template)) {
//         const pdfWidth = pdfDoc.size[width];
//         const pdfHeight = pdfDoc.size[height];
//         let templateMinWidth = getMin(template.dimenssions, w);
//         let templateMaxWidth = getMax(template.dimenssions, w);
//         let templateMinHeight = getMin(template.dimenssions, h);
//         let templateMaxHeight = getMax(template.dimenssions, h);
//         for(i=1; i<parseInt(pdfWidth/templateMinWidth); i++) {

//         }

//     }
// }

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

    image('./image.png', {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
      });

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
