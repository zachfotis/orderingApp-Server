import express from 'express';
import apiController from '../controllers/api.js';

const router = express.Router();

router.get('/places', apiController.getPlaces);
router.get('/coordinates', apiController.getCoordinatesFromAddress);
router.get('/address', apiController.getAddressFromCoordinates);

export default router;
