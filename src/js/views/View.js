import icons from 'url:../../img/icons.svg'; // When Parcel bundles our files it gets icons from the dist folder but our JavaScript is referencing files from our src-->img folders. This line of code here tells JavaScript to import our icons so it can read them from the dist folder. We use this icons variable throughout our markup variable below.

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // IF no data OR data is an array AND data.length = 0 then render an error message
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

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
