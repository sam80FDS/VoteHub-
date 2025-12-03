const express = require('express');
const mongoose = require('mongoose');
const voteRoutes = require('./routes/voteRoutes');
const app = express();

app.use(express.json());
app.use('/api/votes', voteRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
    .catch(err => console.log(err));