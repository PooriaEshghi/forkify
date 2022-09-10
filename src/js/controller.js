import * as model from './model.js'
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import { async } from 'regenerator-runtime';
import 'core-js/stable';
import 'regenerator-runtime'


const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1);
    
    if(!id) return;
    
    recipeView.renderSpinner()
    // 0) Update results view to mark selected search result

    // 1) Update bookmarks view
    bookmarksView.update(model.state.bookmarks)
    resultView.update(model.getSearchResultsPage());
    
    // 2) loading recipe
    await model.loadRecipe(id);
    
    // 3) Rendering recipe
    recipeView.render(model.state.recipe)
    
  } catch (error) {
    recipeView.renderError()
    console.error(error)
  }
};

const controlSearchResult = async function(){
  
  try {
    
    resultView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) load search results
    await model.loadSearchResults(query)
    
    // 3) Render results
    resultView.render(model.getSearchResultsPage())

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search)
    
    
  } catch (error) {
    console.error(error)
    
  }
};
const controlPagination = function(goToPage){
  // 1) Render new results
  resultView.render(model.getSearchResultsPage(goToPage))

  // 2) Render new pagination buttons
  paginationView.render(model.state.search)
}

const controlServing = function(newServings){
  // update the recipe erving ( in tate)
  model.updateServing(newServings)
  // Update the recipe view
  recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe)
};
const controlAddBookmark = function(){
  // 1) Add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
    else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view 
  recipeView.update(model.state.recipe)

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);

};
const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
};
const controlAddRecipe = async function(newRecipe){
  try {
    
    // Show loading spinner
    addRecipeView.renderSpinner();
    
      // Upload the new recipe
    await  model.uploadRecipe(newRecipe)

    // Render recipe
    recipeView.render(model.state.recipe)

    // Success message
    addRecipeView.renderMessage();

    //Render bookmark
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null,'',`#${model.state.recipe.id}`);

    // close from window
    setTimeout(function(){
      addRecipeView.toggleWindow();
    },MODAL_CLOSE_SEC*1000)
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message)
  }

};


const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();