import view from './view';
import icons from 'url:../../img/icons.svg';
class addrecipeview extends view {
  _parentel = document.querySelector('.upload');
  _message = 'recipe is successfully uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnopen = document.querySelector('.nav__btn--add-recipe');
  _btnclose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._addhandlershowwindow();
    this._addhandlerclose();
  }
  togglewindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addhandlershowwindow() {
    this._btnopen.addEventListener('click', this.togglewindow.bind(this));
  }
  _addhandlerclose() {
    this._btnclose.addEventListener('click', this.togglewindow.bind(this));
    this._overlay.addEventListener('click', this.togglewindow.bind(this));
  }
  addhandlerupload(handler) {
    this._parentel.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataarray = [...new FormData(this)];
      const data = Object.fromEntries(dataarray);
      handler(data);
    });
  }
  _generatemarkup() {}
}
export default new addrecipeview();
