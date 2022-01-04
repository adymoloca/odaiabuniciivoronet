import { Router } from 'express';
import { check } from "express-validator";

import generateQR from '../../controllers/admin-control/generate-QR.js';
import loginAdmin from '../../controllers/admin-control/login-admin.js';
import sessionClient from '../../controllers/admin-control/session-client.js';
import existingOrder from '../../controllers/admin-control/get-existing-orders.js';
import generatePDF from '../../controllers/admin-control/generate-pdf.js';
import getScaled from '../../controllers/admin-control/get-scaled-pdf.js';

const adminRoute = Router();

adminRoute.post('/generate-QR', generateQR);
adminRoute.post('/session-id/:uid', [check('clientID').isLength({ min: 12 })], sessionClient);
adminRoute.get('/get-existing-order/:uid', existingOrder);
adminRoute.post('/login-admin', [check('adminID').isLength({min: 4})], loginAdmin);
adminRoute.post('/generate-pdf', generatePDF);
adminRoute.get('/get-plansa', getScaled);

export default adminRoute;