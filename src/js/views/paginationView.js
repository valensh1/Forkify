import View from './View.js';
import icons from 'url:../../img/icons.svg'; // When Parcel bundles our files it gets icons from the dist folder but our JavaScript is referencing files from our src-->img folders. This line of code here tells JavaScript to import our icons so it can read them from the dist folder. We use this icons variable throughout our markup variable below.

// Pagination is the Page Buttons to be displayed at the bottom of the recipe results on left side of screen
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', event => {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto; // Gets data property set in HTML

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page; // Creation of variable curPage that is set to the this._data that was passed into the View.js tab via the render method as an argument. That same render method is calling on this generateMarkup() method and that's why we are able to use this._data and access the page key from that object to get the current page that the user is on
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage // Calculates the number of pages of recipe results that will be displayed on left side of page
    );

    // Page 1 and there are other pages - Displays pagination buttons for ONLY next page since this scenario is for users on Page 1 and so the only button that will be displayed is Page 2 button
    if (curPage === 1 && numPages > 1) {
      return `
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
      `;
    }
    // Last page - Will display pagination button of ONLY the previous page since the user is on the last page.
    if (curPage === numPages && numPages > 1) {
      return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
      `;
    }
    // Other page - User is on NEITHER the first page of the last page so there are buttons for both PREVIOUS PAGE and NEXT PAGE
    if (curPage < numPages) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
     </button>
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
    </button>
      `;
    }

    // Page 1, and there are NO other pages - No page buttons needed because only 1 page of recipe results
    return ``;
  }
}

export default new PaginationView();
