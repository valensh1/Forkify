import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// import 'core-js/stable';  // Polyfilling which is basically making sure some features work in older browsers; Pollyfills everything other than async/await
import { async } from 'regenerator-runtime'; // Polyfilling which is basically making sure some features work in older browsers; Pollyfills async/await

// Jonas Recipe API Documentation - https://forkify-api.herokuapp.com/v2

if (module.hot) {
  // Code here enables the hot module replacement, which reloads the modules that changed without refreshing the whole website. This is code strictly for Parcel and JavaScript wouldn't understand this by itself without Parcel installed.
  module.hot.accept();
}

// API Call
const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1); // Creation of variable id that gets the hash tag id number out of the windows address bar (place where you type in web address). Upon clicking a recipe result on left side this will trigger a id to be placed in this window address bar. The id gets placed there because it is the result of clicking on <a class="preview__link" href="#${result.id}"> in the resultsView.js file and when clicking on there it places the href # into the windows address bar and then we are able to use that id to then make our AJAX/API call for the recipe the user selected to be displayed in main part of page.
    console.log(id);

    if (!id) return; // Guard clause saying if there is no id then just return. This is a modern way to use if else statement without having to put tons of lines of code within blocks
    recipeView.renderSpinner(); // Invoke the renderSpinner function.

    // Loading Recipe
    await model.loadRecipe(id); // Calling the loadRecipe function and passing in the id which we got from our window.location.hash code above. Since this is essentially an API/AJAX call and this returns a promise we need to await that promise.

    // Rendering Recipe
    recipeView.render(model.state.recipe); // Displays the recipe on main part of page which includes everything from id, publisher, sourceURL, image, servings, cooking time, ingredients, etc.
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner(); // Shows spinner when recipe results of search are loading on left side of page

    // Get search query
    const query = searchView.getQuery(); // Gets user search item from search field
    if (!query) return; // Guard clause that if no search term entered by user then just return and it WILL NOT run lines of code below

    // Load search results
    await model.loadSearchResults(query); // invokes the loadSearchResults method passing in the search item from user and then awaiting the API call with the list of recipes related to that search item entered by user

    // Render results
    resultsView.render(model.getSearchResultsPage()); // Invokes render method which ultimately displays each recipe on left side of page with the pagination results (e.g. 10 recipe results per page)

    // Render initial pagination buttons (pagination buttons are the previous and next buttons at bottom of recipe results on left side of screen)
    paginationView.render(model.state.search); // Invokes render method which ultimately displays the pagination buttons on the bottom of the recipe results so the user can scroll pages of recipe results on left side of page.
  } catch (error) {
    console.log(error);
  }
};

// Function that gets called from event listener when user clicks on a pagination button (previous page or next page) to see NEW recipe results on a page with new pagination buttons
const controlPagination = goToPage => {
  // Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage)); // Invokes render method which ultimately displays each recipe on left side of page with the pagination results (e.g. 10 recipe results per page)

  // Render NEW pagination buttons
  paginationView.render(model.state.search); // Invokes render method which ultimately displays the pagination buttons on the bottom of the recipe results so the user can scroll pages of recipe results on left side of page.
};

const controlServings = newServings => {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.render(model.state.recipe);
};

// Initializes upon page load of the application the event listeners below. These are event listeners that are listening on the view page but the action/controls of the event listeners are handled here in the controller.js file. The views page essentially has the event listeners on them and then passes the event right back to controller to then do something with it.
const init = () => {
  recipeView.addHandlerRender(controlRecipes); // Passing the controlRecipes function to the event listener that is in our recipeView file. This event listener basically listens for any recipe clicked from the search results on the left side of screen and then ultimately addHandlerRender() method runs that ultimately renders a recipe on to main part of page
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults); // Ultimately this shows recipe results from search on left hand side of screen. Passes the conrolSearchResults method to the searchView addHandlerSearch method STRICTLY JUST TO HAVE THE EVENT LISTENER ON THE VIEWS PAGE BUT THE FUNCTIONALITY OF THE EVENT LISTENER IS ESSENTIALLY PASSED BACK TO CONTROLLER HERE AND IS CONTROLLED BY THE controlSearchResults METHOD ABOVE.
  paginationView.addHandlerClick(controlPagination); // Ultimately this shows the buttons to be displayed at bottom of recipe results on left hand side of screen
};
init(); // Invokes the init function above
