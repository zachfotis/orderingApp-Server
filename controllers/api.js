import axios from 'axios';

const getPlaces = async (req, res) => {
  const input = req.query.address;

  const options = {
    type: 'street_address',
    input: input,
    language: 'el',
    key: process.env.GOOGLE_PLACES_API_KEY,
  };

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${new URLSearchParams(options)}`;
  const response = await axios.get(url);

  if (response.data.status === 'ZERO_RESULTS') {
    return res.json([]);
  } else {
    const predictions = response.data.predictions.map((prediction) => prediction.description);
    return res.json(predictions);
  }
};

const getCoordinatesFromAddress = async (req, res) => {
  const input = req.query.address;

  const options = {
    address: input,
    key: process.env.GOOGLE_PLACES_API_KEY,
  };

  const url = `https://maps.googleapis.com/maps/api/geocode/json?${new URLSearchParams(options)}`;
  const response = await axios.get(url);

  if (response?.data?.results[0]?.geometry?.location) {
    return res.json(response.data.results[0].geometry.location);
  } else {
    return res.json(null);
  }
};

const getAddressFromCoordinates = async (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;

  const options = {
    latlng: `${lat},${lng}`,
    language: 'el',
    key: process.env.GOOGLE_PLACES_API_KEY,
  };

  const url = `https://maps.googleapis.com/maps/api/geocode/json?${new URLSearchParams(options)}`;
  const response = await axios.get(url);

  if (response?.data?.results[0]?.formatted_address) {
    return res.json(response.data.results[0].formatted_address);
  } else {
    return res.json(null);
  }
};

export default {
  getPlaces,
  getCoordinatesFromAddress,
  getAddressFromCoordinates,
};
