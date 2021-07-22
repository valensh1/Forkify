import icons from 'url:../../img/icons.svg'; // When Parcel bundles our files it gets icons from the dist folder but our JavaScript is referencing files from our src-->img folders. This line of code here tells JavaScript to import our icons so it can read them from the dist folder. We use this icons variable throughout our markup variable below.
// console.log(icons);                       // Prints http://localhost:1234/icons.d4a14980.svg which means it is importing the icons in and its the path to the new icons folder.
import { Fraction } from 'fractional';
// console.log(Fraction);


class RecipeView {
    #parentElement = document.querySelector('.recipe');
    #data;
    #errorMessage = `We could not find that recipe. Please try another one!`
    #message = '';


    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }

    renderSpinner = () => {
        const markup = `
            <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> 
        `;
        this.#clear();  // Clears the text of anything inside parent element passed into the function
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);  // Inserts markup variable into the parent element that was passed into the function
      }

      renderError(message = this.#errorMessage) {
          const markup = `
          <div class="error">
            <div>
                <svg>
                <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
          `;
        this.#clear();  // Clears the text of anything inside parent element passed into the function
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);  // Inserts markup variable into the parent element that was passed into the function
      }

      renderMessage(message = this.#message) {
        const markup = `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
            </div>
            <p>${message}</p>   
      </div>
        `;
      this.#clear();  // Clears the text of anything inside parent element passed into the function
      this.#parentElement.insertAdjacentHTML('afterbegin', markup);  // Inserts markup variable into the parent element that was passed into the function
    }

      // Handler/Event Listeners should listen for events on view page and then send back data to our controller since the controller is supposed to handle our application
      addHandlerRender(handler) {       // Receives controlRecipes from the controller.js file as an argument and then for each id in that handler argument the code below runs the handler function which includes the hashchange and load listeners
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler)); // Add event listener for any change to the hash symbol change in the search bar in Google Chrome; Load event add event listener for any loading of the page we want to run the showRecipe method.
        // window.addEventListener('hashchange', controlRecipes);
        // window.addEventListener('load', controlRecipes);
      }

    #generateMarkup() {
        return `
        <figure class="recipe__fig">
              <img src=${this.#data.image} alt=${this.#data.title} class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this.#data.id}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
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
              ${this.#data.ingredients.map(this.#generateMarkupIngredient).join('')}
            </div>

            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href=${this.#data.sourceURL}
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
    `
    }

    #generateMarkupIngredient(ing) {
            return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
            `;
          }
}

export default new RecipeView();