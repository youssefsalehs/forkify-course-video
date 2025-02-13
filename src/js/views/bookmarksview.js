import view from './view';
import icons from 'url:../../img/icons.svg';
import previewview from './previewview';
class bookmarksview extends view {
  _parentel = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. find a nice recipe to bookmark it;)';
  _message = '';
  addhandlerrender(handler) {
    window.addEventListener('load', handler);
  }
  _generatemarkup() {
    return this._data
      .map(bookmark => previewview.render(bookmark, false))
      .join('');
  }
}
export default new bookmarksview();
