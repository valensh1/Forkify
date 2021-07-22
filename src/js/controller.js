import * as model from './model.js';
import recipeView from './views/recipeView.js';


// import 'core-js/stable';  // Polyfilling which is basically making sure some features work in older browsers; Pollyfills everything other than async/await
import 'regenerator-runtime/runtime'; // Polyfilling which is basically making sure some features work in older browsers; Pollyfills async/await

const recipeContainer = document.querySelector('.recipe');



// Jonas Recipe API Documentation - https://forkify-api.herokuapp.com/v2


// API Call
const controlRecipes = async () => {
  try {

    const id = window.location.hash.slice(1); // Creation of variable id that gets the hash tag id number out of a windows search bar.
    console.log(id);

    if(!id) return; // Guard clause saying if there is no id then just return. This is a modern way to use if else statement without having to put tons of lines of code within blocks
    recipeView.renderSpinner(); // Invoke the renderSpinner function passing in the recipeContainer variable as an argument.
   
    // Loading Recipe
    await model.loadRecipe(id); // Calling the loadRecipe function and passing in the id from our model.js file. Since this is essentially an API/AJAX call and this returns a promise we need to await that promise.

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
}

const init = () => {
  recipeView.addHandlerRender(controlRecipes); // Passing the controlRecipes function to the event listener that is in our recipeView file
}
init(); // Invokes the init function above

