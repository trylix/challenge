import 'reflect-metadata';

import { attachControllers } from '@decorators/express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { HealthController } from 'src/modules/health/health.controller';
import { RecipeController } from 'src/modules/recipe/recipe.controller';

const app = express();

app.use(morgan(':method :url :response-time'));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

attachControllers(app, [HealthController, RecipeController]);

export default app;
