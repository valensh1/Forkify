// Search View is the view on the left side of page which shows all different recipes related to food item user searched for
class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value; // Creation of variable query which is the food item user inputs in search bar.
    this._clearInput(); // Invoking the clearInput method which clears user search terms after user is done entering his food item to search and hits enter or clicks on search button
    return query; // returns a food item that user entered to search for recipes
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = ''; // Clearing of search field after user hits enter or search button
  }

  // This is the event listener on search field that listens for when a user enters data in search field and hits ENTER or clicks on search button; Argument passed into this event listener is a function created on the controller.js file that then passes the functionality back to the controller by the line of code represented by handler() which is the last line of code in this method. This method is only here because it makes sense to put the event listener on the view and pass the functionality of when user submits their search term back to the controller.
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', event => {
      event.preventDefault(); // Prevent reloading of page upon user clicking on a recipe
      handler(); // Passes functionality back to controller (controller.js file) and the controlSearchResults method
    });
  }
}
export default new SearchView();
