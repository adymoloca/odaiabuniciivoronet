import express from 'express';
import connection from 'mongoose';
import cors from 'cors';
import pkg from 'body-parser';
const { json, urlencoded } = pkg;
const { connect } = connection;

import odaiaBunicii from './app/odaiaBunicii.js';

connect('mongodb+srv://odaiabunicii:Voronet2022@odaiabuniciicluster.iiqxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to database')
  }).catch((err) => {
    console.log('connection failed'),
    console.log(err)
  });



const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(json({limit: '400mb'}));
app.use(urlencoded({limit: '400mb', extended: true}));
app.use(json());

app.use('/odaiabunicii/api', odaiaBunicii);

app.listen(5050, () => {console.log('portul este deschis 5050')});