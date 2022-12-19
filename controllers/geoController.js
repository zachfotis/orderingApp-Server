import axios from 'axios';

const getPlaces = async (req, res) => {
  const input = req.query.address;

  const options = {
    type: 'address',
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
    language: 'el',
    key: process.env.GOOGLE_PLACES_API_KEY,
  };

  const url = `https://maps.googleapis.com/maps/api/geocode/json?${new URLSearchParams(options)}`;
  const response = await axios.get(url);

  if (response.data.status === 'ZERO_RESULTS') {
    return res.json(null);
  }

  if (response?.data?.results[0]?.geometry?.location) {
    const coordinates = response.data.results[0].geometry.location;
    const fullAddress = {
      ...addressComponentsToAddress(response.data.results[0].address_components),
      ...coordinates,
    };

    return res.json(fullAddress);
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

  if (response.data.status === 'ZERO_RESULTS') {
    return res.json(null);
  }

  if (response?.data?.results[0]?.geometry?.location) {
    const coordinates = response.data.results[0].geometry.location;
    const fullAddress = {
      ...addressComponentsToAddress(response.data.results[0].address_components),
      ...coordinates,
    };

    return res.json(fullAddress);
  } else {
    return res.json(null);
  }
};

// ----------------- UTILITIES -----------------
const addressComponentsToAddress = (addressComponents) => {
  const address = addressComponents
    .find((component) => {
      return component.types.includes('route');
    })
    ?.long_name?.trim();

  const number = addressComponents
    .find((component) => {
      return component.types.includes('street_number');
    })
    ?.long_name?.trim();

  const area = addressComponents.find((component) => component.types.includes('locality'))?.long_name?.trim();

  const city = addressComponents
    .find((component) => component.types.includes('administrative_area_level_3'))
    ?.long_name?.trim();

  const postalCode = addressComponents.find((component) => component.types.includes('postal_code'))?.long_name?.trim();

  return {
    address,
    number,
    area,
    city,
    postalCode,
  };
};

export default {
  getPlaces,
  getCoordinatesFromAddress,
  getAddressFromCoordinates,
};
