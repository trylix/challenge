import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

const app = express();

app.use(morgan(':method :url :response-time'));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

export default app;
