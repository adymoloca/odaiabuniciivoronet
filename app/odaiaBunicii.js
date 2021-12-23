import express from 'express';

const odaiaBunicii = express();

// Client Routes
import clientRoute from '../routes/client/client-routes.js';

// Admin Routes
import adminRoute from '../routes/admin/admin-routes.js';

// path
odaiaBunicii.use('/clients', clientRoute);
odaiaBunicii.use('/admin', adminRoute);

export default odaiaBunicii;