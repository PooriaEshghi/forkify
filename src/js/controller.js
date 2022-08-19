import { async } from 'regenerator-runtime';
import 'core-js/stable';
import 'regenerator-runtime'
import * as model from './model.js'

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';



const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1);
    
    if(!id) return;
    recipeView.renderSpinner()
    
    // 0) Update results view to mark selected search result

    resultView.update(model.getSearchResultsPage())
    
    // 1) loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe)
    
  } catch (error) {
    recipeView.renderError()
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
  
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
    else model.deleteBookmark(model.state.recipe.id);

  console.log(model.state.recipe);
  recipeView.update(model.state.recipe)
}


const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};
init();