const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/hotelApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Destination = mongoose.model('Destination', new mongoose.Schema({
  uid: String,
  term: String,
  state: String,
  country: String,
}));

app.get('/api/destinations', async (req, res) => {
  const { search = "" } = req.query;
  const regex = new RegExp(search, 'i'); // case-insensitive search

  const results = await Destination.find({
    $or: [
      { term: regex },
      { state: regex },
      { country: regex }
    ]
  }).limit(10);

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});