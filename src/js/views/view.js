import icons from 'url:../../img/icons.svg';
export default class view {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.rendererror();
    }
    this._data = data;
    const markup = this._generatemarkup();
    if (!render) return markup;
    this._parentel.innerHTML = '';
    this._parentel.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newmarkup = this._generatemarkup();
    const newdom = document.createRange().createContextualFragment(newmarkup);
    const newelements = Array.from(newdom.querySelectorAll('*'));
    const curelements = Array.from(this._parentel.querySelectorAll('*'));

    newelements.forEach((newel, i) => {
      const curel = curelements[i];

      if (
        !newel.isEqualNode(curel) &&
        newel.firstChild?.nodeValue.trim() !== ''
      ) {
        curel.textContent = newel.textContent;
      }
      if (!newel.isEqualNode(curel)) {
        Array.from(newel.attributes).forEach(attr => {
          curel.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderspinner = function () {
    const markup = ` <div class="spinner">
                  <svg>
                    <use href="${icons}#icon-loader"></use>
                  </svg>
                </div>`;
    this._parentel.innerHTML = '';
    this._parentel.insertAdjacentHTML('afterbegin', markup);
  };
  rendererror(message = this._errorMessage) {
    const markup = `<div class="error">
                  <div>
                    <svg>
                      <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                  </div>
                  <p>${message}</p>
                </div>`;
    this._parentel.innerHTML = '';
    this._parentel.insertAdjacentHTML('afterbegin', markup);
  }
  rendermsg(message = this._message) {
    const markup = `<div class="message">
                  <div>
                    <svg>
                      <use href="${icons}#icon-smile"></use>
                    </svg>
                  </div>
                  <p>${message}</p>
                </div>`;
    this._parentel.innerHTML = '';
    this._parentel.insertAdjacentHTML('afterbegin', markup);
  }
}
