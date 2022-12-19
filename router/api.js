import express from 'express';
import geoController from '../controllers/geoController.js';

const router = express.Router();

router.get('/places', geoController.getPlaces);
router.get('/coordinates', geoController.getCoordinatesFromAddress);
router.get('/address', geoController.getAddressFromCoordinates);

export default router;
