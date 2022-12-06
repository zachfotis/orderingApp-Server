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

export default {
  getPlaces,
};
