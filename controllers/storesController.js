import Store from '../models/Store.js';

// const populateStores = () => {
//   DummyData.data.forEach(async (store) => {
//     const title = store.attributes.title;
//     const categories = [store.attributes.category];
//     const info = {
//       deliveryTime: Number(store.attributes.info[0].replace("'", '')),
//       minimumOrder: Number(store.attributes.info[1].replace('Ελάχιστη ', '').replace('€', '')),
//     };
//     const ratings = store.attributes.ratings;
//     const images = {
//       logo: store.attributes.logo,
//       cover: store.attributes.cover,
//     };
//     const newStore = new Store({
//       title,
//       categories,
//       info,
//       ratings,
//       images,
//     });

//     await newStore.save();
//     console.log(`Store ${title} created`);
//   });
// };

const getStores = async (req, res) => {
  try {
    const stores = await Store.find({}).limit(6);
    res.status(200).json(stores);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default { getStores };
