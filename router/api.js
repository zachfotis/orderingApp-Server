import express from 'express';
import geoController from '../controllers/geoController.js';
import storesController from '../controllers/storesController.js';

const router = express.Router();

router.get('/places', geoController.getPlaces);
router.get('/coordinates', geoController.getCoordinatesFromAddress);
router.get('/address', geoController.getAddressFromCoordinates);

router.get('/stores', storesController.getStores);

export default router;
