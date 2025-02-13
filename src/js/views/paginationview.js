import view from './view';
import icons from 'url:../../img/icons.svg';
class paginationview extends view {
  _parentel = document.querySelector('.pagination');
  addhandlerclick(handler) {
    this._parentel.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }
  _generatemarkup() {
    const numpages = Math.ceil(
      this._data.results.length / this._data.resperpage
    );
    if (this._data.p === 1 && numpages > 1) {
      return `
          <button data-goto="${
            this._data.p + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.p + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    if (this._data.p === numpages && this._data.p > 1) {
      return `<button data-goto="${
        this._data.p - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.p - 1}</span>
          </button>`;
    }
    if (this._data.p < numpages && this._data.p > 1) {
      return `<button data-goto="${
        this._data.p - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.p - 1}</span>
          </button>
          <button data-goto="${
            this._data.p + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.p + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    return '';
  }
}
export default new paginationview();
