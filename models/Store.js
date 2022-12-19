import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const storeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
  },
  categories: {
    type: [String],
    required: true,
  },
  info: {
    deliveryTime: {
      type: Number,
      required: true,
    },
    minimumOrder: {
      type: Number,
      required: true,
    },
  },
  ratings: {
    average: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  images: {
    logo: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
  },
  menu: {
    type: [menuSchema],
  },
});

export default mongoose.model('stores', storeSchema);
