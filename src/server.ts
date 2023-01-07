import express from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import { requestValidate } from './middlewares/request-schema-validate';
import {
  validateRequest,
  errorHandler,
  NotFoundError,
  currentUser,
  requireAuth,
} from '@hackathonskilldb/common-middlewares';
import { getUniqueDomains, getAllExpertise, addExpertise } from './controller/skillExpertiseController';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  }),
);
app.use(currentUser);

// Routes
app.get('/query', requireAuth, getAllExpertise);
app.get('/domain', requireAuth, getUniqueDomains);
app.post('/query', requireAuth, requestValidate, validateRequest, addExpertise);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export default app;
