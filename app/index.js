import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json' with { type: 'json' };
import { MORGAN_FORMAT } from '../config/application.js';
import apply from './router.js';
const app = express();

app.use(morgan(MORGAN_FORMAT));
app.use(cors());
app.use(json());
app.get('/documentation.json', (req, res) => res.send(swaggerDocument));
app.use('/documentation', serve, setup(swaggerDocument));

export default apply(app);
