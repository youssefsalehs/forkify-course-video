import view from './view';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
class recipeview extends view {
  _parentel = document.querySelector('.recipe');
  _errormsg = 'we could not find this recipe.try another one!';
  _message = '';

  addhandlerrender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  addhandlerupdateserving(handler) {
    this._parentel.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const upto = +btn.dataset.us;
      if (upto > 0 && upto < 27) handler(upto);
    });
  }
  addhandlerbookmark(handler) {
    this._parentel.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  _generatemarkup() {
    return `
 <figure class="recipe__fig">
          <img src="${this._data.img}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>
    <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingtime
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
              <button class="btn--tiny btn--update-servings" data-us="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-us="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated  ${
            this._data.key ? '' : 'hidden'
          }">
             <svg class="">
              <use href="${icons}#icon-user"></use>
            </svg>
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
          ${this._data.ings
            .map(ing => {
              return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ing.quantity ? new Fraction(ing.quantity).toString() : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;
            })
            .join(' ')}
          </ul>
        </div>

        `;
  }
}
export default new recipeview();
