
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //console.log(search)
  let i = 0;
  while (search[i] !== '=')
    i++;
  //console.log(search.substr(i + 1, search.length - i + 1))
  return search.substr(i+1,search.length -i+1)
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let adventures = await fetch(`${config.backendEndpoint}/adventures/?city=${city}`)
  let data = await adventures.json()
  //console.log(data)
  return data;
  }
  catch (err)
  {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parent = document.getElementById("data")
  adventures.forEach(element => {
    let card = document.createElement("a")
    card.setAttribute("id",element.id)
    card.setAttribute("href",`detail/?adventure=${element.id}`)
    card.setAttribute("class", "col-sm-6 col-lg-3 my-3")
    card.innerHTML = `
    <div class="activity-card ">
      <div class="category-banner">${element.category}</div>
      <img src=${element.image} />
      <div class="w-100">
      <div class="d-flex justify-content-between ms-3 me-3 p-2">
        <span >${element.name}</span>
        <span >₹${element.costPerHead}</span>
      </div>
      <div class="d-flex justify-content-between ms-3 me-3 p-2">
        <div >Duration</div>
        <div >${element.duration} Hours</div>
      </div>
      <div>
    </div>
    `
    parent.append(card)
  });
  
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newlist = list.filter(element => {
    return (element.duration>=low && element.duration<=high)
  })
  //console.log(newlist)
  return newlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let newList = list.filter((element) => {
    return categoryList.includes(element.category)
  })
  return newList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredlist = list;
  if (filters["category"].length !== 0)
  {
    filteredlist =  filterByCategory(filteredlist, filters["category"]);
  }
  //console.log(filters["duration"])
  if (filters['duration'].length > 0)
  {
    //console.log("hello")
    let str = filters["duration"];
    let i = str.indexOf('-')
    let low = parseInt(str.substr(0, i))
    let high = parseInt(str.substr(i + 1))
    //console.log(low, high)
    filteredlist = filterByDuration(filteredlist,low,high)
  }
  
  // Place holder for functionality to work in the Stubs
  return filteredlist
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let data = JSON.parse(window.localStorage.getItem("filters"))
  //console.log(data)
  //if( data && data["category"].length === 0 && )
  if (data && ((data["category"].length !== 0)|| data["duration"]!==""))
    return data;
  // Place holder for functionality to work in the Stubs
  else
  {
    window.localStorage.clear()
    return null;
    }
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if (filters["duration"].length > 0)
  {
    let duration = filters["duration"];
    let index = 0;
    let options = document.getElementById("duration-select").options
    //console.log(options);
    for (let i = 0; i < options.length; i++)
    {
      if (options[i].value === duration)
      {
        document.getElementById("duration-select").selectedIndex = i;
        break;
        }
      }
  }

  if (filters["category"].length !== 0) {
    let categorylist = filters["category"];
    let parent = document.getElementById("category-list")

    categorylist.forEach((element) => {
      //console.log(element)
      let pill = document.createElement("div")
      pill.setAttribute("class", "category-filter")
      pill.innerHTML = `
      ${element}<button type="button" class="btn-close" aria-label="Close" onclick="handlebtnclose('${element}')"></button>`
      //pill.innerText = element;
      //console.log(pill)
      parent.append(pill)
    })
  }
}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
