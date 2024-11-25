const express = require('express');
const path = require('path');
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();

app.use(express.static(path.join(__dirname)));
app.use('/', restaurantRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
