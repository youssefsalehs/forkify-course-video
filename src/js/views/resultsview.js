import view from './view';
import icons from 'url:../../img/icons.svg';
import previewview from './previewview';
class resultsview extends view {
  _parentel = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';
  _generatemarkup() {
    return this._data.map(res => previewview.render(res, false)).join('');
  }
}
export default new resultsview();
