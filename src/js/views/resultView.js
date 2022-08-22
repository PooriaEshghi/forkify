import View from "./view";
import previewView from "./previewView";

import icons from 'url:../../img/icons.svg';


class ResultView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipe find for your query!please try agane ';
    _message = '';
    _generateMarkup(){
      
      return this._data.map(result => previewView.render(result, false)).join('');

    }   
        
};
export default new ResultView();