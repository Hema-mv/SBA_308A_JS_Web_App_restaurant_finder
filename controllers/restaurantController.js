
const apiKey = 'AIzaSyDR_wS0yE9OiSJ7UmPz9dkdzA4oMCeHgpc'; 
const axios = require('axios');

exports.getHome = (req, res) => {
    res.sendFile('index.html', { root: 'views' });
};

exports.getRestaurants = (req, res) => {
    res.sendFile('restaurants.html', { root: 'views' });
};

exports.getNearbyRestaurants = async (req, res) => {
    const { latitude, longitude, cuisine, distance, reviews } = req.query;
    
    let apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${distance || 5000}&type=restaurant&key=${apiKey}`;

    if (cuisine) {
        apiUrl += `&keyword=${cuisine}`;
    }
    // if (distance) {
    //     apiUrl += `&keyword=${distance}`;
    // }
    // if (reviews) {
    //     apiUrl += `&keyword=${reviews}`;
    // }
    console.log(apiUrl)
    try {
        const response = await axios.get(apiUrl);
        let restaurants = response.data.results;

        // Filter by minimum reviews if specified
        if (reviews) {
            restaurants = restaurants.filter(restaurant => restaurant.user_ratings_total >= reviews);
        }

        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from API');
    }
};
