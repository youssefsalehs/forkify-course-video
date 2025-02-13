class searchview {
  _parentel = document.querySelector('.search');
  getquery() {
    const query = this._parentel.querySelector('.search__field').value;
    this._parentel.querySelector('.search__field').value = '';
    this._parentel.querySelector('.search__field').focus();
    return query;
  }
  addhandlersearch(handler) {
    this._parentel.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchview();
