import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';


// import 'core-js/stable';  // Polyfilling which is basically making sure some features work in older browsers; Pollyfills everything other than async/await
import { async } from 'regenerator-runtime'; // Polyfilling which is basically making sure some features work in older browsers; Pollyfills async/await


// Jonas Recipe API Documentation - https://forkify-api.herokuapp.com/v2

if (module.hot) {     // Code here enables the hot module replacement, which reloads the modules that changed without refreshing the whole website. This is code strictly for Parcel and JavaScript wouldn't understand this by itself without Parcel installed.
  module.hot.accept();
}


// API Call
const controlRecipes = async () => {
  try {

    const id = window.location.hash.slice(1); // Creation of variable id that gets the hash tag id number out of a windows search bar.
    console.log(id);

    if(!id) return; // Guard clause saying if there is no id then just return. This is a modern way to use if else statement without having to put tons of lines of code within blocks
    recipeView.renderSpinner(); // Invoke the renderSpinner function.
   
    // Loading Recipe
    await model.loadRecipe(id); // Calling the loadRecipe function and passing in the id from our model.js file. Since this is essentially an API/AJAX call and this returns a promise we need to await that promise.

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
}

const controlSearchResults = async() => {
  try {

    resultsView.renderSpinner();

    // Get search query
      const query = searchView.getQuery();
      if(!query) return;

      // Load search results
      await model.loadSearchResults(query);

      // Render results
      // console.log(model.state.search.results);
      resultsView.render(model.state.search.results);
  } catch(error) {
      console.log(error);
  }
}

const init = () => {
  recipeView.addHandlerRender(controlRecipes); // Passing the controlRecipes function to the event listener that is in our recipeView file
  searchView.addHandlerSearch(controlSearchResults);
}
init(); // Invokes the init function above

