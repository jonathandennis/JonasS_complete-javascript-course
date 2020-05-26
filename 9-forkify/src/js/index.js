////////////////////////////////////////////
// import export examples 

// default exports just export/import 1 thing
//ex0 import str from './models/Search';  // ex0 single import/export 

// Named exports used to export multiple items
//ex1 import { add as a, multiply as m, ID } from './views/searchView';  // Example of ability to change name at import, as well as import multiple things
//ex2 import * as searchView from './views/searchView';   // * = import all and reassign name   

//ex1 console.log(`Using imported functions! ${a(ID, 2)} and ${m(3, 5)}. ${str}`);
//ex2 console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${str}`); 

/////////////////////////////////////////////
// This is our Controller
/////////////////////////////////////////////
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

///////////////////////////////////
//Search Controller
///////////////////////////////////
const controlSearch = async () => {
    // 1- Get query from view
    const query = searchView.getInput(); 
    

    if (query) {    // if there is a query
        // 2- New search object and add to state
        state.search = new Search(query); 

        // 3- Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4- Search for recipes
            await state.search.getResults();

            // 5- Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }    
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();  // stops page reload on every search click
    controlSearch();
});

// Trick here is to set listeners to buttons that may or may not be displayed depending on pagination.
// Using .closest which allows us to set listener to certain elements
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); // closest selects .btn-inline and elements in it.
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); // refer to searchView/createButton and data attribute set to retrieve page data easily. 10 is the base number.
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

///////////////////////////////////
// Recipe controller
///////////////////////////////////

const controlRecipe = async () => {
    // Get id from url
    const id = window.location.hash.replace('#', ' ');   // window location is the entire url
    console.log(id);

    if (id) {
        //prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        //create new recipe object
        state.recipe = new Recipe(id);

        try {
            //get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            alert('Error processing recipe!');
        }
    }
};

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
// ABOVE AND BELOW DO THE SAME THING
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

