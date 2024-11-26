const apiKey = 'AIzaSyDR_wS0yE9OiSJ7UmPz9dkdzA4oMCeHgpc'; 

document.addEventListener('DOMContentLoaded', () => {
    const locationButton = document.getElementById('find-nearby');
    const restaurantList = document.getElementById('restaurant-list');
    const cuisineFilter = document.getElementById('cuisine-filter');
    const distanceFilter = document.getElementById('distance-filter');
    const reviewFilter = document.getElementById('review-filter');

    if (locationButton) {
        locationButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        });
    }
    function displayRestaurants(restaurants) {
        const restaurantList = document.getElementById('restaurant-list');
        restaurantList.innerHTML = '';
    
        restaurants.forEach(restaurant => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${restaurant.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=apiKey` : 'https://via.placeholder.com/150'}" class="card-img-top" alt="${restaurant.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${restaurant.name}</h5>
                                <p class="card-text"><strong>Rating:</strong> ${restaurant.rating} stars</p>
                                <p class="card-text"><strong>Address:</strong> ${restaurant.vicinity}</p>
                                <p class="card-text"><small class="text-muted">${restaurant.types.join(', ')}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            restaurantList.appendChild(listItem);
        });
    }
    
    async function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const cuisine = cuisineFilter.value;
        const distance = distanceFilter.value;
        const reviews = reviewFilter.value;

        try {
            const response = await fetch(`/nearby-restaurants?latitude=${latitude}&longitude=${longitude}&cuisine=${cuisine}&distance=${distance}&reviews=${reviews}`);
            const nearbyRestaurants = await response.json();
            restaurantList.innerHTML = '';
            nearbyRestaurants.forEach(restaurant => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="card mb-3">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="${restaurant.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=AIzaSyDR_wS0yE9OiSJ7UmPz9dkdzA4oMCeHgpc` : 'https://via.placeholder.com/150'}" class="card-img-top" alt="${restaurant.name}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${restaurant.name}</h5>
                                    <p class="card-text"><strong>Rating:</strong> ${restaurant.rating} stars</p>
                                    <p class="card-text"><strong>Address:</strong> ${restaurant.vicinity}</p>
                                    <p class="card-text"><small class="text-muted">${restaurant.types.join(', ')}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                restaurantList.appendChild(listItem);
            });
        } catch (error) {
            alert('2.Error fetching data from server');
        }
    }
});
