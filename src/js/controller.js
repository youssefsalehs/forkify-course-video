import * as model from './model.js';
import recipeview from './views/recipeview.js';
import searchview from './views/searchview.js';
import resultsview from './views/resultsview.js';
import paginationview from './views/paginationview.js';
import bookmarksview from './views/bookmarksview.js';
import previewview from './views/previewview.js';
import addrecipeview from './views/addrecipeview.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { async } from 'regenerator-runtime';

const controlrecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeview.renderspinner();
    resultsview.update(model.getsearchresultspage());
    await model.loadrecipe(id);
    recipeview.render(model.state.recipe);
    bookmarksview.update(model.state.bookmarks);
  } catch (err) {
    recipeview.rendererror();
  }
};
const controlsearchresults = async function () {
  try {
    resultsview.renderspinner();
    const query = searchview.getquery();
    if (!query) return;
    await model.loadsearchresults(query);
    resultsview.render(model.getsearchresultspage());
    paginationview.render(model.state.search);
  } catch (err) {
    recipeview.rendererror();
  }
};
const controlpagnation = function (goto) {
  resultsview.render(model.getsearchresultspage(goto));
  paginationview.render(model.state.search);
};
const controlservings = function (newserving) {
  model.updateservings(newserving);
  recipeview.update(model.state.recipe);
};
const controlbookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addbookmark(model.state.recipe);
  } else {
    model.removebookmark(model.state.recipe.id);
  }

  recipeview.update(model.state.recipe);
  bookmarksview.render(model.state.bookmarks);
};
const controlbookmark2 = function () {
  bookmarksview.render(model.state.bookmarks);
};
const controladdrecipe = async function (newrecipe) {
  try {
    addrecipeview.renderspinner();
    await model.uploadrecipe(newrecipe);
    console.log(model.state.recipe);
    recipeview.render(model.state.recipe);
    addrecipeview.rendermsg();
    bookmarksview.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addrecipeview.togglewindow();
    }, 2500);
  } catch (err) {
    addrecipeview.rendererror(err);
  }
};
const init = function () {
  bookmarksview.addhandlerrender(controlbookmark2);
  recipeview.addhandlerrender(controlrecipes);
  recipeview.addhandlerbookmark(controlbookmark);
  searchview.addhandlersearch(controlsearchresults);
  paginationview.addhandlerclick(controlpagnation);
  recipeview.addhandlerupdateserving(controlservings);
  addrecipeview.addhandlerupload(controladdrecipe);
};
init();
