import express from 'express';
import apiController from '../controllers/api.js';

const router = express.Router();

router.get('/places', apiController.getPlaces);

export default router;
