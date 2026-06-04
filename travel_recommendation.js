function search() {
    const keyword = document.getElementById("searchInput").value;
    console.log("Searching for:", keyword);
}

function resetSearch() {
    document.getElementById("searchInput").value = "";
}

async function fetchRecommendations() {
    try {
      const response = await fetch('travel_recommendation_api.json');
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
  
      console.log(data);
  
      // Example: Display destination names
      data.countries.forEach(country => {
        console.log(country.name);
      });
  
    } 
    catch (error) {
      console.error('Error:', error);
    }
}
  
fetchRecommendations();

let travelData = {};

// Load JSON data once
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log(data);
  })
  .catch(error => console.error(error));

// Search button event
document.getElementById('searchBtn').addEventListener('click', searchRecommendations);

function searchRecommendations() {

    const keyword = document
        .getElementById('searchInput')
        .value
        .trim()
        .toLowerCase();

    let results = [];

    // Beach / Beaches
    if (keyword === 'beach' || keyword === 'beaches') {
        results = travelData.beaches;
    }

    // Temple / Temples
    else if (keyword === 'temple' || keyword === 'temples') {
        results = travelData.temples;
    }

    // Country / Countries
    else if (keyword === 'country' || keyword === 'countries') {
        results = travelData.countries;
    }

    displayResults(results);
}

function displayResults(results) {

    const resultsContainer =
        document.getElementById('results');

    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML =
            '<p>No recommendations found.</p>';
        return;
    }

     results.forEach(place => {

        const card = document.createElement('div');

        card.classList.add('result-card');

        card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}">

            <div class="result-card-content" style = "color: black;">
                <h3>${place.name}</h3>

                <p>${place.description}</p>

                <button class="visit-btn">
                    Visit
                </button>
            </div>
        `;

        resultsContainer.appendChild(card);
    });
}

document.getElementById('clearBtn')
    .addEventListener('click', () => {

        document.getElementById('searchInput').value = '';
        document.getElementById('results').innerHTML = '';
});