import * as config from './config.js';
import * as helpers from './helpers.js';
import bookmarksview from './views/bookmarksview.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    p: 1,
    results: [],
    resperpage: config.resperpage,
  },
  bookmarks: [],
};
const createrecipeobject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    img: recipe.image_url,
    servings: recipe.servings,
    cookingtime: recipe.cooking_time,
    ings: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadrecipe = async function (id) {
  try {
    const data = await helpers.ajax(`${config.API_URL}${id}?key=${config.key}`);
    state.recipe = createrecipeobject(data);
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    // console.log(res, data);
    // console.log(state.recipe);
  } catch (err) {
    // Temp error handling
    throw err;
  }
};
export const loadsearchresults = async function (query) {
  try {
    state.search.query = query;
    state.search.p = 1;
    const data = await helpers.ajax(
      `${config.API_URL}?search=${query}&key=${config.key}`
    );
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        img: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch {
    throw err;
  }
};
export const updateservings = function (newservings) {
  state.recipe.ings.forEach(ing => {
    ing.quantity = ing.quantity * (newservings / state.recipe.servings);
  });
  state.recipe.servings = newservings;
};
export const getsearchresultspage = function (p = state.search.p) {
  state.search.p = p;
  const start = (p - 1) * state.search.resperpage;
  const end = p * state.search.resperpage;
  return state.search.results.slice(start, end);
};
const presistbookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addbookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  presistbookmarks();
};
export const removebookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  presistbookmarks();
};
const clearbookmarks = function () {
  localStorage.clear('bookmarks');
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

console.log(state.bookmarks);
export const uploadrecipe = async function (newrecipe) {
  try {
    const ingredients = Object.entries(newrecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingarr = ing[1].split(',').map(el => el.trim());
        if (ingarr.length !== 3)
          throw new Error(
            'wrong ingredient format! please use the correct format'
          );
        const [quantity, unit, description] = ingarr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newrecipe.title,
      source_url: newrecipe.sourceUrl,
      image_url: newrecipe.image,
      publisher: newrecipe.publisher,
      cooking_time: +newrecipe.cookingTime,
      servings: +newrecipe.servings,
      ingredients,
    };
    const data = await helpers.ajax(
      `${config.API_URL}?key=${config.key}`,
      recipe
    );
    state.recipe = createrecipeobject(data);
    addbookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
