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
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchRecommendations();