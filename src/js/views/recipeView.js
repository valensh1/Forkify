import View from './View.js';
import icons from 'url:../../img/icons.svg'; // When Parcel bundles our files it gets icons from the dist folder but our JavaScript is referencing files from our src-->img folders. This line of code here tells JavaScript to import our icons so it can read them from the dist folder. We use this icons variable throughout our markup variable below.
// console.log(icons);                       // Prints http://localhost:1234/icons.d4a14980.svg which means it is importing the icons in and its the path to the new icons folder.
import { Fraction } from 'fractional';
// console.log(Fraction);

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = `We could not find that recipe. Please try another one!`;
  _message = '';

  // Handler/Event Listeners should listen for events on view page and then send back data to our controller since the controller is supposed to handle our application
  addHandlerRender(handler) {
    // Receives controlRecipes from the controller.js file as an argument and then for each id in that handler argument the code below runs the handler function which includes the hashchange and load listeners
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler)); // Add event listener for any change to the hash symbol change in the search bar in Google Chrome; Load event add event listener for any loading of the page we want to run the showRecipe method.
    // window.addEventListener('hashchange', controlRecipes); // Easier way to combine both of these event listeners into one via line of code directly above.
    // window.addEventListener('load', controlRecipes); // Easier way to combine both of these event listeners into one via line of code (2 lines above)
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', event => {
      const btn = event.target.closest('.btn--update-servings');
      if (!btn) return;
      console.log(btn);
      const { updateTo } = btn.dataset; // Convert dataset in HTML (data-update-to="${this._data.servings - 1} from generateMarkup() method below to a number. + sign in front of btn.dataset is what converts the string from the dataset into a number.
      if (+updateTo > 0) handler(+updateTo); // Pass the argument updateTo back into the handler which is the function passed into this method which essentially brings control of code back to controller.
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', event => {
      const btn = event.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
              <img src=${this._data.image} alt=${
      this._data.title
    } class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this._data.id}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  this._data.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  this._data.servings
                }</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--update-servings" data-update-to="${
                    this._data.servings - 1
                  }">
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--update-servings" data-update-to="${
                    this._data.servings + 1
                  }">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated">
              </div>
              <button class="btn--round btn--bookmark">
                <svg class="">
                  <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
                </svg>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
              ${this._data.ingredients
                .map(this._generateMarkupIngredient)
                .join('')}
            </div>

            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  this._data.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href=${this._data.sourceURL}
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${
                  ing.quantity ? new Fraction(ing.quantity).toString() : ''
                }</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
            `;
  }
}

export default new RecipeView();
