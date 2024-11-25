const axios = require('axios');
const apiKey = 'AIzaSyDR_wS0yE9OiSJ7UmPz9dkdzA4oMCeHgpc'; 

exports.getHome = (req, res) => {
    res.sendFile('index.html', { root: 'views' });
};

exports.getRestaurants = (req, res) => {
    res.sendFile('restaurants.html', { root: 'views' });
};




export async function getNearbyRestaurants(latitude, longitude, cuisine, distance, reviews) {
    const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key
    let apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${distance || 5000}&type=restaurant&key=${apiKey}`;

    if (cuisine) {
        apiUrl += `&keyword=${cuisine}`;
    }

    try {
        const response = await axios.get(apiUrl);
        let restaurants = response.data.results;

        if (reviews) {
            restaurants = restaurants.filter(restaurant => restaurant.user_ratings_total >= reviews);
        }

        return restaurants;
    } catch (error) {
        throw new Error('Error fetching data from API');
    }
}
