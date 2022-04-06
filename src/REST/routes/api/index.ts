import express from 'express';
import { bankerRoute } from './bankerRoute';
import { clientRoute } from './clientRoute';
import { transactionRoute } from './transactionRoute';

const router = express.Router();

router.use('/client', clientRoute);
router.use('/banker', bankerRoute);
router.use('/', transactionRoute);

export { router };
