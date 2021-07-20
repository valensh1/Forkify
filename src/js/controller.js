import icons from 'url:../img/icons.svg'; // When Parcel bundles our files it gets icons from the dist folder but our JavaScript is referencing files from our src-->img folders. This line of code here tells JavaScript to import our icons so it can read them from the dist folder. We use this icons variable throughout our markup variable below.
console.log(icons);                       // Prints http://localhost:1234/icons.d4a14980.svg which means it is importing the icons in and its the path to the new icons folder.
import 'core-js/stable';  // Polyfilling which is basically making sure some features work in older browsers; Pollyfills everything other than async/await
import 'regenerator-runtime/runtime'; // Polyfilling which is basically making sure some features work in older browsers; Pollyfills async/await

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Jonas Recipe API Documentation - https://forkify-api.herokuapp.com/v2
const renderSpinner = (parentEl) => {
  const markup = `
      <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
  `;
  parentEl.innerHTML = '';  // Clears the text of anything inside parent element passed into the function
  parentEl.insertAdjacentHTML('afterbegin', markup);  // Inserts markup variable into the parent element that was passed into the function
}

// API Call
const showRecipe = async () => {
  try {
    renderSpinner(recipeContainer); // Invoke the renderSpinner function passing in the recipeContainer variable as an argument.
    const response = await fetch('https:forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');  // API call
    const data = await response.json(); // Get data from response and use .json() method to turn it into a JavaScript object
    if(!response.ok) throw new Error(`${data.message} (${res.status})`);  // Creation of a custom error message. IF response.ok is false ! turns it to true so that it can throw New Error message
    console.log(response, data);  // Prints Response {type: "cors", url: "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886", redirected: false, status: 200, ok: true, …} {status: "success", data: {…}}
    let { recipe } = data.data; // Destucture of data object received back on the recipe key
    recipe = {              // Creation of new recipe object because the data object returned has a lot of underscores in names and we don't want that in our variable names; Reassigning our recipte variable we created above and using destructured recipe variable to retrieve key/value pairs.
      id: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }
    console.log(recipe);

    // Creation of markup variable which contains HTML to insert into DOM with the insertAdjacentHTML method.
    const markup = `
        <figure class="recipe__fig">
              <img src=${recipe.image} alt=${recipe.title} class="recipe__img" />
              <h1 class="recipe__title">
                <span>${recipe.id}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--increase-servings">
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--increase-servings">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round">
                <svg class="">
                  <use href="${icons}#icon-bookmark-fill"></use>
                </svg>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
              ${recipe.ingredients.map(ingredient => {
                return `
                  <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                      <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ingredient.quantity}</div>
                    <div class="recipe__description">
                      <span class="recipe__unit">${ingredient.unit}</span>
                      ${ingredient.description}
                    </div>
                  </li>
                `;
              }).join('')}
            </div>

            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href=${recipe.sourceURL}
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
    `
    recipeContainer.innerHTML = ''; // Blank out HTML text that is already there in our Markup which says <p>Start by searching for a recipe or an ingredient. Have fun!</p> so that we can insert the markup variable above using the insertAdjacentHTML method below. This line of code removes the spinner we created upon the loading of the recipe.
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    alert(error);
  }
}
showRecipe(); // Invokes function showRecipe
