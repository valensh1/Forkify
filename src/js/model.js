import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  // Creation of variable state that holds ALL OUR DATA FOR APPLICATION
  recipe: {},
  search: {
    query: '', // Holds latest search item entered by user
    results: [], // Holds all recipe results returned by food item entered in search field by user
    page: 1, // Page to start all search results on; Could have multiple pages of recipe results but we start at page 1
    resultsPerPage: RES_PER_PAGE, // 10 results per page; Comes from config.js file
  },
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`); // AJAX/API call based upon id passed into method which was taken from the hash in the browser window and then turned into JavaScript object via the getJSON method and saved into a variable called data. Must await data since this line of code returns a promise and we need the results of that Promise.

    const { recipe } = data.data; // Destructure of data object received back on the recipe key

    state.recipe = {
      // Creation of new recipe object because the data object returned has a lot of underscores in names and we don't want that in our variable names; Reassigning our recipte variable we created above and using destructured recipe variable to retrieve key/value pairs.
      id: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.error(`${error}🔥🔥🔥🔥`);
    throw error;
  }

  console.log(state.recipe);
};

export const loadSearchResults = async query => {
  try {
    state.search.query = query; // Set variable search which is our data model and set the query to the food item entered in search bar by user
    const data = await getJSON(`${API_URL}?search=${query}`); // Creation of a variable called data which awaits the API call of the search term entered in by user and then performs getJSON method on the item returned from API call to turn it into a viable JavaScript object; API_URL comes from the config.js file and it is the address for which the AJAX/API uses to retrieve the recipe data
    console.log(data); // Prints the data returned from the API call

    state.search.results = data.data.recipes.map(rec => {
      // Sets the results key in the state variable (our Model that holds all our data) and takes the recipe results for the searched food item entered in by user and returns an object that contains the id, title, publisher and image for all returned recipes
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (error) {
    console.error(`${error}🔥🔥🔥🔥`);
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  // Method that takes in a search page as an argument (default search page is set to our Model in its original state which is page 1)
  state.search.page = page; // Sets our model with the current page
  const start = (page - 1) * state.search.resultsPerPage; // Gets the starting recipe results to show by taking say page 3 subtracting 1 and multiplying by results per page which in this case is 10; (3-1) * 10 = 20
  const end = page * state.search.resultsPerPage; // Gets the ending recipe results to show by taking say page 3 and multiplying by results per page which in this case is 10; 3 * 10 = 30
  return state.search.results.slice(start, end); // This will return an array that contains the start and finish recipe results which if current page is 3 then it will show results 20-30 as calculated above.
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings); // New Quantity = Old quantity * (new servings / old servings)
  });

  state.recipe.servings = newServings;
};
