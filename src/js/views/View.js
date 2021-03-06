import icons from 'url:../../img/icons.svg'; // When Parcel bundles our files it gets icons from the dist folder but our JavaScript is referencing files from our src-->img folders. This line of code here tells JavaScript to import our icons so it can read them from the dist folder. We use this icons variable throughout our markup variable below.

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // IF no data OR data is an array AND data.length = 0 then render an error message
    this._data = data; // Sets data which is the sliced recipe results from left side of page (data sliced for pagination - e.g. 10 results per page)
    const markup = this._generateMarkup(); // Invokes the generateMarkup() method which takes the sliced pagination data (e.g. 10 recipe results on left side of page) and then passes that into a generateMarkupPreview() method which ultimately gets all the html to display on page which is the recipes to display on left side of page or pagination buttons to display (buttons to go to next page or previous page). This will then be used to pass into the insertAdjacentHtml method below to display in DOM.
    this._clear(); // Clears out any previous recipe results that were displaying on left side of page so that we can show new results
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Inserts each recipe (sliced for pagination e.g. 10 results per page) on left side of page.
  }

  update(data) {
    this._data = data; // Sets data which is the sliced recipe results from left side of page (data sliced for pagination - e.g. 10 results per page)
    const newMarkup = this._generateMarkup(); // Invokes the generateMarkup() method which takes the sliced pagination data (e.g. 10 recipe results on left side of page) and then passes that into a generateMarkupPreview() method which ultimately gets all the html to display on page which is the recipes to display on left side of page or pagination buttons to display (buttons to go to next page or previous page). This will then be used to pass into the insertAdjacentHtml method below to display in DOM.

    const newDOM = document.createRange().createContextualFragment(newMarkup); // Creation of a variable called newDOM which is assigned the value of converting html into a node list
    const newElements = Array.from(newDOM.querySelectorAll('*')); // Creation of a variable called newElements which is assigned to taking all the elements of the newDOM variable above and converting it to an array
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // Creation of a variable called curElements which is assigned to taking all the elements of the _parentElement and converting it to an array

    // Algorithm to only render what changed in DOM - We want this to compare what changed in DOM after we increased the servings to what was there before and only render any differences. We are comparing newElements vs. curElements
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i]; // Get the curElement to compare against the newEl for each iteration in loop
      // console.log(curEl, newEl.isEqualNode(curEl)); // isEqualNode is a function that compares nodes to each other and will return true if same and false if different

      // Updates Changed Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' // First child is the text content of the node that's why we are using firstChild method and then nodeValue method if there is text will return the text value. All other node values that aren't text it will return null
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates Changed Attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = ''; // Clears parent elements HTML so can display new recipe results
  }

  // Function used to display spinner when waiting for results from API calls such as search results or for final recipe results upon clicking on one of the recipes
  renderSpinner = () => {
    const markup = `
            <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> 
        `;
    this._clear(); // Clears the text of anything inside parent element passed into the function
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Inserts markup variable into the parent element that was passed into the function
  };

  renderError(message = this._errorMessage) {
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
    this._clear(); // Clears the text of anything inside parent element passed into the function
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Inserts markup variable into the parent element that was passed into the function
  }

  renderMessage(message = this._message) {
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
    this._clear(); // Clears the text of anything inside parent element passed into the function
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Inserts markup variable into the parent element that was passed into the function
  }
}
