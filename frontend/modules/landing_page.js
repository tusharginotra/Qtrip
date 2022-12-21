import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let cities = await fetch(`${config.backendEndpoint}/cities`)
  let data = await cities.json()
  //console.log(data)
  return data;
  }
  catch (error)
  {
    return null
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parent = document.getElementById("data")

  let card = document.createElement("div")
  card.setAttribute("class", "col-sm-6 col-md-4 col-lg-3 mb-4 ")
  card.innerHTML =`<a class="tile" href="pages/adventures/?city=${id}" id=${id} >
                <img src=${image} alt="city-image"/>
                  <div class="tile-text text-center">
                   ${city}
                   </br>
                   ${description} 
                  </div>
                </a>
          `
  parent.append(card)
}

export { init, fetchCities, addCityToDOM };
