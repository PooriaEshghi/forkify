import View from "./view";
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'recipe was successfuly uplosded';

    _window = document.querySelector(".add-recipe-window")
    _overlay = document.querySelector(".overlay")
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal')

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHiddenWindow();
    }
    toggleWindow(){
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }
    
    _addHandlerShowWindow(){
        this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
    }
    _addHandlerHiddenWindow(){
        this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
        this._overlay.addEventListener('click',this.toggleWindow.bind(this))
    }
    addHandlerUpload(handlere){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handlere(data);
        })
    }

    _generateMarkup(){
    }    
}
export default new AddRecipeView;